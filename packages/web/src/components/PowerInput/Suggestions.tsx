import * as React from 'react';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import MuiListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

import type { IStep } from '@automatisch/types';
import useFormatMessage from 'hooks/useFormatMessage';
import AppIcon from 'components/AppIcon';

const ListItemText = styled(MuiListItemText)``;

type SuggestionsProps = {
  data: any[];
  onSuggestionClick: (variable: any) => void;
};

const SHORT_LIST_LENGTH = 4;
const LIST_HEIGHT = 256;

const getPartialArray = (array: any[], length = array.length) => {
  return array.slice(0, length);
};

const Suggestions = (props: SuggestionsProps) => {
  const { data, onSuggestionClick = () => null } = props;
  const [current, setCurrent] = React.useState<number | null>(0);
  const [listLength, setListLength] = React.useState<number>(SHORT_LIST_LENGTH);

  const formatMessage = useFormatMessage();

  const [filter, setFilter] = React.useState<string>('');
  const [filtered, setFiltered] = React.useState<any[] | null>();

  React.useEffect(() => {
    if (!filter) {
      setFiltered(null);
      return;
    }

    const filteredData = data
      .map((step: any) => {
        // If the step name matches the filter, return the step
        if (step.name.toLowerCase().includes(filter.toLowerCase())) {
          return step;
        }

        // Otherwise, filter the output variables
        const output = step.output.filter((variable: any) => {
          const name = variable.name.replace(`step.${step.id}.`, '');
          return name.toLowerCase().includes(filter.toLowerCase());
        });
        return { ...step, output };
      })
      // Remove steps that don't have any output variables
      .filter((step: any) => {
        return step.output.length > 0;
      });

    setFiltered(filteredData);
  }, [filter])

  const expandList = () => {
    setListLength(Infinity);
  };

  const collapseList = () => {
    setListLength(SHORT_LIST_LENGTH);
  };

  React.useEffect(() => {
    setListLength(SHORT_LIST_LENGTH);
  }, [current]);

  return (
    <Paper elevation={5} sx={{ width: '100%' }}>

      <FormControl fullWidth>
        <TextField
          variant="outlined"
          label={formatMessage("flowEditor.setupAction.searchVariable")}
          sx={{ m: 2 }}
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <SearchIcon
                  sx={{ color: (theme) => theme.palette.primary.main }}
                />
              </InputAdornment>,
          }}
          onChange={(event) => setFilter(event.target.value)}
          data-test="search-for-variable-text-field"
        />
      </FormControl>

      <List disablePadding>
        {(filtered || data).map((option: IStep, index: number) => (
          <Box key={`${option.appKey}-${option.id}`}>
            <ListItemButton
              divider
              onClick={() =>
                setCurrent((currentIndex) =>
                  currentIndex === index ? null : index
                )
              }
              sx={{ py: 1, gap: 1.6 }}
            >
              <AppIcon
                color="transparent"
                url={option.iconUrl}
                name={option.name}
                sx={{ width: 24, height: 24 }}
              />
              <ListItemText primary={option.name} />

              {!filter && !!option.output?.length &&
                (current === index ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>

            <Collapse in={current === index || !!filter} timeout="auto" unmountOnExit>
              <List
                component="div"
                disablePadding
                sx={{ maxHeight: LIST_HEIGHT, overflowY: 'auto' }}
                data-test="power-input-suggestion-group"
              >
                {getPartialArray((option.output as any) || [], listLength).map(
                  (suboption: any, index: number) => (
                    <ListItemButton
                      sx={{ pl: 4 }}
                      divider
                      onClick={() => onSuggestionClick(suboption)}
                      data-test="power-input-suggestion-item"
                      key={`suggestion-${suboption.name}`}
                    >
                      <ListItemText
                        primary={suboption.name.replace(`step.${option.id}.`, '')}
                        primaryTypographyProps={{
                          variant: 'subtitle1',
                          title: 'Property name',
                          sx: { fontWeight: 700 },
                        }}
                        secondary={suboption.value || ''}
                        secondaryTypographyProps={{
                          variant: 'subtitle2',
                          title: 'Sample value',
                          noWrap: true,
                        }}
                      />
                    </ListItemButton>
                  )
                )}
              </List>

              {(option.output?.length || 0) > listLength && (
                <Button fullWidth onClick={expandList}>
                  Show all
                </Button>
              )}

              {listLength === Infinity && !filter && (
                <Button fullWidth onClick={collapseList}>
                  Show less
                </Button>
              )}
            </Collapse>
          </Box>
        ))}
      </List>
    </Paper>
  );
};

export default Suggestions;

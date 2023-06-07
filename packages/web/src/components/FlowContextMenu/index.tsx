import * as React from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import type { PopoverProps } from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from 'notistack';

import { DELETE_FLOW } from 'graphql/mutations/delete-flow';
import { DUPLICATE_FLOW } from 'graphql/mutations/duplicate-flow';
import { GET_FLOW } from 'graphql/queries/get-flow';
import * as URLS from 'config/urls';
import useFormatMessage from 'hooks/useFormatMessage';

type ContextMenuProps = {
  flowId: string;
  onClose: () => void;
  anchorEl: PopoverProps['anchorEl'];
};

export default function ContextMenu(
  props: ContextMenuProps
): React.ReactElement {
  const { flowId, onClose, anchorEl } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [getFlow] = useLazyQuery(GET_FLOW)
  const [deleteFlow] = useMutation(DELETE_FLOW);
  const [duplicateFlow] = useMutation(
    DUPLICATE_FLOW,
    {
      refetchQueries: ['GetFlows'],
    }
  );
  const formatMessage = useFormatMessage();

  const onFlowDuplicate = React.useCallback(async () => {
    await duplicateFlow({
      variables: { input: { id: flowId } },
    });

    enqueueSnackbar(formatMessage('flow.successfullyDuplicated'), {
      variant: 'success',
    });

    onClose();
  }, [flowId, onClose, duplicateFlow]);

  const onFlowExport = React.useCallback(async () => {
    const { data } = await getFlow({ variables: { id: flowId } });
    const flow = data?.getFlow;
    if (!flow) {
      console.error('Flow not found');
      onClose();
      return;
    }

    const exportData = {
      name: flow.name,
      steps: flow.steps.map((step: any) => {
        return {
          id: step.id,
          key: step.key,
          appKey: step.appKey,
          type: step.type,
          position: step.position,
          parameters: step.parameters,
        }
      })
    }
    const exportString = JSON.stringify(exportData, null, 2);

    const link = document.createElement("a");
    link.href = `data:text/json;chatset=utf-8,${encodeURIComponent(exportString)}`;
    link.download = `${flow.name}.json`;
    link.click();
    link.remove();

    onClose();
  }, [flowId, onClose]);

  const onFlowDelete = React.useCallback(async () => {
    await deleteFlow({
      variables: { input: { id: flowId } },
      update: (cache) => {
        const flowCacheId = cache.identify({
          __typename: 'Flow',
          id: flowId,
        });

        cache.evict({
          id: flowCacheId,
        });
      },
    });

    enqueueSnackbar(formatMessage('flow.successfullyDeleted'), {
      variant: 'success',
    });

    onClose();
  }, [flowId, onClose, deleteFlow]);

  return (
    <Menu
      open={true}
      onClose={onClose}
      hideBackdrop={false}
      anchorEl={anchorEl}
    >
      <MenuItem component={Link} to={URLS.FLOW(flowId)}>
        {formatMessage('flow.view')}
      </MenuItem>

      <MenuItem onClick={onFlowDuplicate}>{formatMessage('flow.duplicate')}</MenuItem>

      <MenuItem onClick={onFlowExport}>{formatMessage('flow.export')}</MenuItem>

      <MenuItem onClick={onFlowDelete}>{formatMessage('flow.delete')}</MenuItem>
    </Menu>
  );
}

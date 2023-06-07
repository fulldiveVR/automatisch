import { IJSONObject, IStep } from '@automatisch/types';
import Context from '../../types/express/context';
import Step from '../../models/step';

type Params = {
    input: {
        name: string;
        steps: [
            {
                id: string,
                key: string,
                appKey: string,
                type: IStep['type'],
                position: number,
                parameters: IJSONObject
            }
        ]
    };
};

type NewStepIds = Record<string, string>;

function updateStepId(value: string, newStepIds: NewStepIds) {
    let newValue = value;

    const stepIdEntries = Object.entries(newStepIds);
    for (const stepIdEntry of stepIdEntries) {
        const [oldStepId, newStepId] = stepIdEntry;
        const partialOldVariable = `{{step.${oldStepId}.`;
        const partialNewVariable = `{{step.${newStepId}.`;

        newValue = newValue.replace(partialOldVariable, partialNewVariable);
    }

    return newValue;
}

function updateStepVariables(parameters: Step['parameters'], newStepIds: NewStepIds): Step['parameters'] {
    const entries = Object.entries(parameters);
    return entries.reduce((result, [key, value]: [string, unknown]) => {
        if (typeof value === 'string') {
            return {
                ...result,
                [key]: updateStepId(value, newStepIds),
            };
        }

        if (Array.isArray(value)) {
            return {
                ...result,
                [key]: value.map(item => updateStepVariables(item, newStepIds)),
            };
        }

        return {
            ...result,
            [key]: value,
        };
    }, {});
}

const importFlow = async (
    _parent: unknown,
    params: Params,
    context: Context
) => {
    const importedFlow = await context.currentUser
        .$relatedQuery('flows')
        .insert({
            name: params.input.name,
            active: false,
        });

    const newStepIds: NewStepIds = {};
    for (const step of params.input.steps) {
        const importedStep = await importedFlow.$relatedQuery('steps')
            .insert({
                key: step.key,
                appKey: step.appKey,
                type: step.type,
                position: step.position,
                parameters: updateStepVariables(step.parameters, newStepIds),
            });
        newStepIds[step.id] = importedStep.id;
    }

    return importedFlow;
};

export default importFlow;

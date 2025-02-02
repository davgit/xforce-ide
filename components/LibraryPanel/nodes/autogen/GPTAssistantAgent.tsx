import { ClsHeaderSkeleton, DefaultContent, ToolbarSkeleton } from '@/components/LibraryPanel/nodes/ToolbarSkeleton';
import { ValidatorContext } from '@/contexts/ValidatorContext';
import useDnDStore from '@/stores/useDnDStore';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Handle, NodeToolbar, Position, NodeProps as ReactFlowNodeProps, useReactFlow } from 'reactflow';
import { XForceNodesEnum } from '../nodeTypes';

const GPTAssistantAgent: React.FC<ReactFlowNodeProps> = (props) => {
  const { errors } = React.useContext(ValidatorContext);
  const { addNodeData } = useDnDStore();
  const { getNode } = useReactFlow();

  const data = getNode(props.id)?.data;
  const [toolbarVisible, setToolbarVisible] = React.useState(false);

  const onAgentNameChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value.trim();
      addNodeData(props.id, { variableName: val });
    },
    [addNodeData, props.id],
  );
  const onOAIIdChange = React.useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      const val = evt.target.value.trim();
      addNodeData(props.id, { OAIId: val });
    },
    [addNodeData, props.id],
  );

  return (
    <div className="rounded-sm border border-gray-200 bg-white w-80">
      <div
        className={`${XForceNodesEnum.GPT_ASSISTANT_AGENT} flex justify-between items-center border-b border-gray-200 py-2`}
      >
        <div className="font-bold ml-2">GPTAssistantAgent</div>
        <InformationCircleIcon
          width={24}
          className="text-gray-300 mr-2"
          onMouseEnter={() => setToolbarVisible(true)}
          onMouseLeave={() => setToolbarVisible(false)}
        />
        <NodeToolbar isVisible={toolbarVisible} position={Position.Top}>
          <ToolbarSkeleton
            header={<ClsHeaderSkeleton name="GPTAssistantAgent" />}
            content={
              <DefaultContent
                name="GPTAssistantAgent"
                description="is an agent that leverages the OpenAI Assistant API for conversational capabilities."
                docTeaser={`Agent Name: Name of the agent. (ex: my_gpt_assistant_agent_1)\n\nOpenAI ID: The id of the agent that you obtained from https://platform.openai.com/assistants.`}
              />
            }
          />
        </NodeToolbar>
      </div>
      <div className="p-2 bg-gray-50">
        <div className="flex justify-between items-center">
          <div>Agent Name *</div>
          <input
            type="text"
            placeholder="my_agent"
            defaultValue=""
            onChange={onAgentNameChange}
            value={data?.variableName || ''}
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
          />
        </div>
        {errors?.[props.id]?.variableName && (
          <span className="text-red-500 text-xs">{errors?.[props.id]?.variableName}</span>
        )}
      </div>
      <div className="p-2 bg-gray-50 pt-2">
        <div className="flex justify-between items-center pt-2">
          <div>OpenAI ID *</div>
          <input
            type="text"
            placeholder="asst-****"
            onChange={onOAIIdChange}
            defaultValue=""
            value={data?.OAIId || ''}
            className="px-1 bg-gray-100 rounded-sm border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-teal-500"
          />
        </div>
        {errors?.[props.id]?.OAIId && <span className="text-red-500 text-xs">{errors?.[props.id]?.OAIId}</span>}
      </div>
      <Handle type="target" position={Position.Top} className="rounded-none border-none w-16" />
      <Handle type="source" position={Position.Bottom} className="rounded-none border-none w-16" />
    </div>
  );
};

export default GPTAssistantAgent;

import ProjectForm from '@/pages/Project/ProjectForm';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Divider, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';

const ProjectSelectAdd: React.FC<{
  mode?: string;
  initialValue?: any;
  onChange?: (value: any) => void;
  bordered?: boolean;
  [key: string]: any;
}> = ({ mode, initialValue, onChange, bordered, ...restProps }) => {
  const [projectModalOpen, setProjectModalOpen] = useState<boolean>(false);
  const [projectList, setProjectList] = useState<{ value: string | undefined; label: string }[]>(
    [],
  );
  const [value, setValue] = useState();
  const { projectEnum, ready, toggleSelector } = useModel('selector');

  // 如果还没请求就先请求
  useEffect(() => {
    if (!ready) {
      toggleSelector();
    }
  }, [ready, toggleSelector]);
  //Chatbot:
  // 根据代码，可以看出在 `<Form.Item name="created_by">` 和 `<Form.Item name="checked_by">` 中使用的是 Ant Design 的 Form 组件，
  // 同时内部嵌套了自定义的 `UserSelectAdd` 组件。在 `UserSelectAdd` 组件中，使用了 `Select` 组件来渲染下拉框，同时通过 `defaultValue` 属性设置了初始值。
  // 但是，这个初始值并不会自动反映到 `Form.Item` 组件上，这是因为 `Form.Item` 组件是受控组件，它的值由 `Form` 组件管理。
  // 如果想让 `Form.Item` 组件显示 `Select` 组件中的值，需要在 `Select` 组件中通过 `onChange` 属性来更新 `Form.Item` 组件的值。具体的实现方式如下：
  // 1. 在 `UserSelectAdd` 组件中定义一个 `handleChange` 函数，用于处理 `Select` 组件的值变化事件，将选中的值通过 `onChange` 回调函数传递给父组件。
  const handleChange = (value: any) => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  useEffect(() => {
    setProjectList(projectEnum);
  }, [projectEnum]);

  return (
    <div>
      <Select
        bordered={bordered}
        style={{ minWidth: '100px' }}
        mode={mode && mode === 'multiple' ? 'multiple' : undefined}
        value={value}
        defaultValue={initialValue}
        onChange={handleChange}
        placeholder="请选择"
        // @ts-ignore
        filterOption={(input, option) => (option?.label ?? '').includes(input)}
        filterSort={(optionA, optionB) =>
          // @ts-ignore
          (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
        }
        options={projectList}
        showSearch
        dropdownRender={(menu) => (
          <>
            {menu}
            <Divider style={{ margin: '8px 0' }} />
            <Space style={{ padding: '0 8px 4px' }}>
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={() => {
                  setProjectModalOpen(true);
                }}
              >
                增加项目
              </Button>
            </Space>
          </>
        )}
        {...restProps}
      />
      <ProjectForm
        modalOpen={projectModalOpen}
        setModalOpen={setProjectModalOpen}
        setProjectList={setProjectList}
      ></ProjectForm>
    </div>
  );
};
export default ProjectSelectAdd;

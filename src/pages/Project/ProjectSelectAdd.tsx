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
  useEffect(() => {
    setProjectList(projectEnum);
  }, [projectEnum]);

  // 如果还没请求就先请求
  useEffect(() => {
    if (!ready) {
      toggleSelector();
    }
  }, [ready, toggleSelector]);
  const handleChange = (value: any) => {
    setValue(value);
    if (onChange) {
      onChange(value);
    }
  };



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

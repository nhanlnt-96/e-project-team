import './EditorComp.scss';

import { InputStatus } from 'antd/es/_util/statusUtils';
import React from 'react';

import { Editor, IAllProps } from '@tinymce/tinymce-react';

interface IProps extends IAllProps {
  editorHeight?: number;
  status?: InputStatus;
}

const EditorComp: React.FC<IProps> = ({ editorHeight = 500, status, ...props }) => {
  return (
    <div className={`w-full editor-comp editor-comp-status__${status}`}>
      <Editor
        {...props}
        apiKey={process.env.REACT_APP_TINY_EDITOR_API_KEY}
        init={{
          height: editorHeight,
          menubar: false,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount'
          ],
          toolbar:
            'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | charmap table removeformat code image media link | fullscreen preview',
          // eslint-disable-next-line camelcase
          content_style: 'body { font-family:\'Jost\', sans-serif; font-size:16px }'
        }}
      />
    </div>
  );
};

export default EditorComp;

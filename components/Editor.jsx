"use client";

import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import "@blocknote/core/style.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useTheme } from "next-themes";
import { TagsButton } from "./TagsButton";

import {
  BasicTextStyleButton,
  BlockTypeSelect,
  ColorStyleButton,
  CreateLinkButton,
  FileCaptionButton,
  FileReplaceButton,
  FormattingToolbar,
  FormattingToolbarController,
  NestBlockButton,
  TextAlignButton,
  UnnestBlockButton,
  useCreateBlockNote,
} from "@blocknote/react";

const Editor = ({ onChange, initialContent, editable }) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();


  const handleUpload = async (file) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };


  const [blocks, setBlocks] = useState(initialContent ? JSON.parse(initialContent) : []);
  const editor = useCreateBlockNote({
    initialContent: blocks    
  })

  console.log("editor", editor)
  // const editor = useBlockNote({
  //   editable,
  //   initialContent: initialContent ? JSON.parse(initialContent) : [],
  //   onEditorContentChange: (editor) => {
  //     // const currentBlock = editor.getTextCursorPosition().block;
  //     // const newBlock = {
  //     //   ...currentBlock,
  //     //   createdAt: new Date().toISOString(),
  //     //   updatedAt: new Date().toISOString(),
  //     //   tags: ["test"],
  //     // };

  //     // const updatedBlocks = editor.topLevelBlocks.map((block) => {
  //     //   if (block.id === currentBlock.id) {
  //     //     return newBlock;
  //     //   }
  //     //   return block;
  //     // });

  //     // console.log("updated Blocks", updatedBlocks);
  //     // console.log("newBlock", newBlock);
  //     console.log("onchange")
  //     onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
  //   },
  //   uploadFile: handleUpload,
  // });                                    

  return (
    <div>
      {/* <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      /> */}



      {/* <BlockNoteView
        editor={editor}
        onChange={() => {
          onChange(JSON.stringify(editor.document, null, 2));
        }}
        onSelectionChange={() => {
          const selection = editor.getSelection();
          console.log("selection", selection);
        }}
        uploadFile={handleUpload}
      /> */}



   <BlockNoteView editor={editor} onChange={() => {
        onChange(JSON.stringify(editor.document, null, 2));
      }} formattingToolbar={false}>
        <FormattingToolbarController
          formattingToolbar={() => (
            <FormattingToolbar>
              <BlockTypeSelect key={"blockTypeSelect"} />

              <TagsButton block={editor.getTextCursorPosition().block}  key={"tagsButton"} />


              <FileCaptionButton key={"fileCaptionButton"} />
              <FileReplaceButton key={"replaceFileButton"} />

              <BasicTextStyleButton
                basicTextStyle={"bold"}
                key={"boldStyleButton"}
              />
              <BasicTextStyleButton
                basicTextStyle={"italic"}
                key={"italicStyleButton"}
              />
              <BasicTextStyleButton
                basicTextStyle={"underline"}
                key={"underlineStyleButton"}
              />
              <BasicTextStyleButton
                basicTextStyle={"strike"}
                key={"strikeStyleButton"}
              /> 
              {/* Extra button to toggle code styles */}
               <BasicTextStyleButton
                key={"codeStyleButton"}
                basicTextStyle={"code"}
              />

              <TextAlignButton
                textAlignment={"left"}
                key={"textAlignLeftButton"}
              />
              <TextAlignButton
                textAlignment={"center"}
                key={"textAlignCenterButton"}
              />
              <TextAlignButton
                textAlignment={"right"}
                key={"textAlignRightButton"}
              />

              <ColorStyleButton key={"colorStyleButton"} />

              <NestBlockButton key={"nestBlockButton"} />
              <UnnestBlockButton key={"unnestBlockButton"} />

              <CreateLinkButton key={"createLinkButton"} />
            </FormattingToolbar>
          )}
        />
      </BlockNoteView> 
    </div>
  );
};

export default Editor;

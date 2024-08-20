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

  console.log("initial content", initialContent)
  const [blocks, setBlocks] = useState(initialContent ? initialContent : []);
  const editor = useCreateBlockNote({
    initialContent: blocks    
  })

  const handleChange = (currentBlock) => {
    const exisitingBlock = initialContent.find((block) => block.id == currentBlock.id);

    if (exisitingBlock) {
      const updatedBlocks = initialContent.map((block) => {
        if (block.id == currentBlock.id) {
          const now = new Date().toISOString();
          return {
            ...currentBlock,
            createdAt: block.createdAt,
            updatedAt: now,
          };
        } else {
          return block;
        }
      });
      onChange(updatedBlocks.filter((block) => block.content != [] || block.content.text?.trim() !== ''));
    } else {
      const updatedBlocks = [
        ...initialContent,
        {
          ...currentBlock,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      onChange(updatedBlocks.filter((block) => block.content != [] || block.content.text?.trim() !== ''));
      }
  };                                

  return (
    <div>

   <BlockNoteView 
      editor={editor} 
      onChange={() => {
        const currentBlock = editor.getTextCursorPosition().block
        console.log("currentBlock", currentBlock)
        if (!currentBlock.tags) {
          currentBlock.tags = []
        }
        handleChange(currentBlock)
        }} 
      formattingToolbar={false} 
      // uploadfile={handleUpload}
      >
        <FormattingToolbarController
          formattingToolbar={() => (
            <FormattingToolbar>
              <BlockTypeSelect key={"blockTypeSelect"} />

              <TagsButton block={editor.getTextCursorPosition().block} initialContent={initialContent} handleChange={handleChange}  key={"tagsButton"} />


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

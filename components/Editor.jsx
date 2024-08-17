"use client";

import { useEdgeStore } from "@/lib/edgestore";
import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote, useCreateBlockNote } from "@blocknote/react";
import { useTheme } from "next-themes";

const Editor = ({ onChange, initialContent, editable }) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();


  const handleUpload = async (file) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  const editor = useBlockNote({
    editable,
    initialContent: initialContent ? JSON.parse(initialContent) : [],
    onEditorContentChange: (editor) => {
      // const currentBlock = editor.getTextCursorPosition().block;
      // const newBlock = {
      //   ...currentBlock,
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString(),
      //   tags: ["test"],
      // };

      // const updatedBlocks = editor.topLevelBlocks.map((block) => {
      //   if (block.id === currentBlock.id) {
      //     return newBlock;
      //   }
      //   return block;
      // });

      // console.log("updated Blocks", updatedBlocks);
      // console.log("newBlock", newBlock);

      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
  });                                    

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;

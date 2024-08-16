"use client";

import { useEdgeStore } from "@/lib/edgestore";
import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
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
    initialContent: initialContent == [] ? JSON.parse(initialContent) : undefined,
    onEditorContentChange: (editor) => {
      console.log("editor.topLevelBlocks", editor.topLevelBlocks[0].id);
      console.log("editor", editor,);
      // onChange(JSON.stringify(editor.topLevelBlocks, null, 2), editor.topLevelBlocks[0].id);
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

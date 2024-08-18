import {
    useBlockNoteEditor,
    useComponentsContext,
    useEditorContentOrSelectionChange,
} from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { useState } from "react";
import { Popover, Menu } from "@mantine/core";

// Custom Formatting Toolbar Button to toggle blue text & background color.
export  function TagsButton({ block  }) {
    const editor = useBlockNoteEditor();
    const Components = useComponentsContext();

    const [selectedTag, setSelectedTag] = useState(null);

    const tags = ["School", "Work", "Project", "Todos"];

    const handleClick = (tag) => {
            
        }

    return (
        <div>

            <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <Components.FormattingToolbar.Button
                        mainTooltip={"Choose Tag for this block"}
                        variant={selectedTag ? "filled" : "outline"}
                        color={selectedTag ? "blue" : "gray"}
                    >
                        {selectedTag || "Add Tag"}
                    </Components.FormattingToolbar.Button>
                </Popover.Target>
                <Popover.Dropdown className="!shadow-xl">
                    <Menu classNames={{ item: "!text-[12px] !font-light !px-4 !py-1.5"  }}>
                        {tags.map((tag, index) => (
                            <Menu.Item  
                                key={index}
                                className="!text-[12px] !font-light !rounded hover:bg-[#121212]"
                                onClick={() => {
                                    if (block.tags === undefined) {
                                        block.tags = [];
                                        block.tags.push(tag);
                                        setSelectedTag(tag);
                                        // onChange(JSON.stringify(editor.document, null, 2));
                                    } else if (block.tags.includes(tag)) {
                                        block.tags = block.tags.filter((t) => t !== tag);
                                        setSelectedTag(null);
                                        return;
                                        // onChange(JSON.stringify(editor.document, null, 2));
                                    } else {
                                        block.tags.push(tag);
                                        setSelectedTag(tag);
                                        // onChange(JSON.stringify(editor.document, null, 2));
                                    }
                                    console.log("block", block);
                                }}
                            >
                                {tag}
                            </Menu.Item>
                        ))}
                    </Menu>
                </Popover.Dropdown>
            </Popover>
        </div>
    );
}
import {
    useBlockNoteEditor,
    useComponentsContext,
} from "@blocknote/react";
import "@blocknote/mantine/style.css";
import { useState } from "react";
import { Popover, Menu } from "@mantine/core";

// Custom Formatting Toolbar Button to toggle blue text & background color.
export  function TagsButton({ block, handleChange, initialContent }) {
    const editor = useBlockNoteEditor();
    const Components = useComponentsContext();

    const [selectedTag, setSelectedTag] = useState(null);

    const tags = ["School", "Work", "Project", "Todos"];

    // const handleClick = (tag) => {
            
    //     }

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
                                    const exisitingBlock = initialContent.find((item) => item.id == block.id )
                                    if (exisitingBlock) {
                                        console.log("Existing", exisitingBlock)
                                        if (!exisitingBlock.tags){
                                            exisitingBlock.tags = []
                                            exisitingBlock.tags.push(tag)
                                            setSelectedTag(tag)
                                        }else if (exisitingBlock.tags.includes(tag)){
                                            exisitingBlock.tags = exisitingBlock.tags.filter((t) => t !== tag);
                                            setSelectedTag(null)
                                        }else{
                                            exisitingBlock.tags.push(tag)
                                            setSelectedTag(tag)
                                        }                                        
                                    }
                                    handleChange(exisitingBlock)
                                    console.log("block", exisitingBlock);
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
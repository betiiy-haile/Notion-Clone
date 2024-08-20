'use client'

import Cover from "@/components/Cover";
import Editor from "@/components/Editor";
import Toolbar from "@/components/Toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

const Page = () => {
  const documentId = "j575nnaaw0wz5t3nksmfy1cvks6z2gej"
  
  const document = useQuery(api.documents.getById, {
    documentId: documentId,
  });
  const update = useMutation(api.documents.update);
  const onChange = (content) => {
    const filterd = content.filter(item => item.content != [] && item.content[0]?.text.trim() !== "")
    console.log("filtered", filterd)

    update({
      id: documentId,
      title: document.title,
      content: filterd,
    });
  };

  if (document == undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not found</div>;
  }


  return (
    <div className="py-32">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
        
      </div>
    </div>
  );
};

export default Page;

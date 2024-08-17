'use client'
// import { Footer } from "./_components/Footer";
// import Heading from "./_components/Heading";
// import React from "react";
// import { Heroes } from "./_components/Heroes";

import Cover from "@/components/Cover";
import Editor from "@/components/Editor";
import Toolbar from "@/components/Toolbar";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

const Page = () => {
  const documentId = "j57bc8v5v05e0w858qk5hfkd4h6yyryv"

  const document = useQuery(api.documents.getById, {
    documentId: documentId,
  });

  const blocks = useQuery(api.blocks.getBlocks)
  const update = useMutation(api.documents.update);

  const onChange = (content) => {
    update({
      id: documentId,
      content,
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
        {/* <Toolbar initialData={blocks} />
        <Editor onChange={onChange} initialContent={blocks} /> */}
      </div>
    </div>
  );
};

export default Page;

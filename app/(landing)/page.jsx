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
  // return (
  //   <div className="min-h-full flex flex-col dark:bg-[#1F1F1F]">
  //     <div
  //       className="flex flex-col items-center justify-center md:justify-start
  //     text-center gap-y-8 flex-1 px-6 pb-10"
  //     >
  //       <Heading />
  //       <Heroes />
  //     </div>
  //     <Footer />
  //   </div>
  // );
  const documentId = "j57bc8v5v05e0w858qk5hfkd4h6yyryv"

  const document = useQuery(api.documents.getById, {
    documentId: documentId,
  });

  const update = useMutation(api.documents.update);

  const onChange = (content) => {
    update({
      id: documentId,
      content,
    });
  };

  if (document === undefined) {
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
      {/* <Cover url={document.coverImage} /> */}
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} />
        <Editor onChange={onChange} initialContent={document.content} />
      </div>
    </div>
  );
};

export default Page;

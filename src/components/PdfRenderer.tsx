// import { Document, Page } from "react-pdf";
// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

const PdfRenderer = () => {
  return (
    <div className="flex w-full flex-col items-center rounded-md bg-white shadow">
      <div className="flex h-14 w-full items-center justify-between border-b border-zinc-200 px-2">
        <div className="flex items-center gap-1.5">
          <h1> pdf renderer </h1>
        </div>
      </div>

      <div className="max-h-screen w-full flex-1"></div>
    </div>
  );
};

export default PdfRenderer;

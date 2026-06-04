"use client"

type PdfPreviewProps = {
  src: string
  title: string
}

export function PdfPreview({ src, title }: PdfPreviewProps) {
  const previewSrc = `${src}#toolbar=1&navpanes=0&scrollbar=1`

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
      <object
        data={previewSrc}
        type="application/pdf"
        title={title}
        className="h-[min(70vh,720px)] w-full bg-white"
      >
        <iframe
          src={previewSrc}
          title={title}
          className="h-[min(70vh,720px)] w-full bg-white"
        />
      </object>
    </div>
  )
}

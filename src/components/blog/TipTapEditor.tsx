"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Youtube from "@tiptap/extension-youtube";
import ImageExtension from "@tiptap/extension-image";
import LinkExtension from "@tiptap/extension-link";
import { useState, useRef } from "react";

interface TipTapEditorProps {
  content: string;
  onChange: (html: string) => void;
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Youtube.configure({ controls: true }),
      ImageExtension,
      LinkExtension.configure({ openOnClick: false }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  function addYoutubeVideo() {
    if (youtubeUrl && editor) {
      editor.commands.setYoutubeVideo({ src: youtubeUrl });
      setYoutubeUrl("");
      setShowYoutubeInput(false);
    }
  }

  function addLink() {
    const url = window.prompt("URL do link:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    setUploadingImage(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const { url } = await res.json();
        editor.chain().focus().setImage({ src: url }).run();
      }
    } catch {}
    setUploadingImage(false);
    if (imageInputRef.current) imageInputRef.current.value = "";
  }

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-white">
      <div className="flex flex-wrap gap-1 p-2 bg-muted border-b border-border">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          title="Negrito"
        >
          <strong>B</strong>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          title="Itálico"
        >
          <em>I</em>
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 2 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          title="Título"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("heading", { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          title="Subtítulo"
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          title="Lista"
        >
          &bull;
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          title="Lista Numerada"
        >
          1.
        </ToolbarButton>
        <ToolbarButton
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          title="Citação"
        >
          &ldquo;
        </ToolbarButton>
        <ToolbarButton active={false} onClick={addLink} title="Link">
          🔗
        </ToolbarButton>
        <ToolbarButton
          active={false}
          onClick={() => imageInputRef.current?.click()}
          title="Inserir Imagem"
        >
          {uploadingImage ? "..." : "🖼"}
        </ToolbarButton>
        <ToolbarButton
          active={false}
          onClick={() => setShowYoutubeInput(!showYoutubeInput)}
          title="YouTube"
        >
          ▶
        </ToolbarButton>
      </div>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {showYoutubeInput && (
        <div className="flex gap-2 p-2 bg-muted border-b border-border">
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="URL do YouTube"
            className="flex-1 px-3 py-1.5 text-sm rounded border border-border focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <button
            onClick={addYoutubeVideo}
            className="px-3 py-1.5 text-sm bg-primary text-white rounded hover:bg-primary-light"
          >
            Inserir
          </button>
        </div>
      )}

      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[300px] bg-white focus:outline-none [&_.ProseMirror]:outline-none [&_.ProseMirror]:min-h-[280px]"
      />
    </div>
  );
}

function ToolbarButton({
  active,
  onClick,
  title,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2.5 py-1.5 text-sm rounded transition-colors ${
        active
          ? "bg-primary text-white"
          : "text-foreground hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}

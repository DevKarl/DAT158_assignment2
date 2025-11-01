interface Props {
  onUpload: (blob: Blob, url: string) => void;
}

export default function PhotoUpload({ onUpload }: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onUpload(file, url);
    }
  };

  return (
    <div className="photo-upload">
      <input type="file" accept="image/*" onChange={handleFileChange} />
    </div>
  );
}

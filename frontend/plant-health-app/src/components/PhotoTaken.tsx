interface Props {
  photoURL: string;
}

export default function PhotoTaken({ photoURL }: Props) {
  return (
    <>
      <img src={photoURL} alt="Captured" className="captured-photo" />
    </>
  );
}

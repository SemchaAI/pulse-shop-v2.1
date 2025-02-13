import Image from 'next/image';

type PropType = {
  url: string;
  selected: boolean;
  img: string;
  onClick: () => void;
};

export const ProductThumbnail: React.FC<PropType> = (props) => {
  const { selected, img, onClick, url } = props;

  return (
    <div className={`flex-0 min-w-0 ${selected ? 'bg-foreground' : ''}`}>
      <button
        onClick={onClick}
        type="button"
        className="w-full flex items-center justify-center transition bg-card"
      >
        <Image
          priority={true}
          width="150"
          height="150"
          src={`${url}/${img}`}
          alt="product image"
        />
      </button>
    </div>
  );
};

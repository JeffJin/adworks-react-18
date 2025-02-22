
export function ImagePlaceholder({width, height}: {width: number, height: number}) {

  return (
    <img
      src={'/images/image-load-failed.png'}
      alt={'placeholder image'}
      width={width || 256}
      height={height || 256}
    />
  );
}

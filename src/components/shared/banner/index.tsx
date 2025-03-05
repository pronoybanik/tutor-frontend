import styles from "./Banner.module.css";

const Banner = ({ title, path }: { title: string; path: string }) => {
  return (
    <div
      className={`${styles.banner} border-2  border-white my-8 rounded-3xl  flex justify-center items-center overflow-hidden bg-white/10 backdrop-blur-md shadow-lg p-6 brightness-75`}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

      <div className="text-center text-white z-10">
        <h2 className="font-bold text-2xl leading-loose">{title}</h2>
        <p className="text-sm opacity-200 font-medium ">{path}</p>
      </div>
    </div>
  );
};

export default Banner;

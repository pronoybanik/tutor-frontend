import styles from "./Banner.module.css";

const Banner = ({ title, path }: { title: string; path: string }) => {
  return (
    <div
      className={`${styles.banner} border-2  border-white rounded-3xl  flex justify-center items-center overflow-hidden bg-white/10 backdrop-blur-md shadow-lg p-6`}
    >
      <div className="text-center text-white">
        <h2 className="font-bold text-2xl leading-loose">{title}</h2>
        <p className="text-sm opacity-80">{path}</p>
      </div>
    </div>
  );
};

export default Banner;

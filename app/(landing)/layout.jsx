import Navbar from "./_components/Navbar";

const MarketingLayout = ({ children }) => {
  return (
    <div className="h-full dark:bg-[#1F1F1F]">
      {/* <Navbar /> */}
      <main className="h-full">{children}</main>
    </div>
  );
};

export default MarketingLayout;

const Footer = () => {
  return (
    <footer className="flex items-center justify-between px-6 py-4 text-sm text-gray-600 bg-gray-100 m-4">
      <div className="flex items-center space-x-2">
        <div className="w-16 h-16 bg-gray-300 flex items-center justify-center text-xs">64X64</div>
        <div>
          <p className="font-semibold">BOOKWORM</p>
          <p>Address</p>
          <p>Phone</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

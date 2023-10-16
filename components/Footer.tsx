function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-amber-50 dark:bg-neutral-700 sticky mt-auto">
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        &copy; {currentYear} Copyright:
        <a className="text-neutral-800 dark:text-neutral-400" href="/">
          {" "}
          IG
        </a>
      </div>
    </footer>
  );
}

export default Footer;

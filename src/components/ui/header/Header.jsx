export const Header = ({ title = "" }) => {
  return (
    <header className="container-xxl d-flex align-items-center justify-content-center py-3">
      <h1 className="my-0">{title}</h1>
    </header>
  );
};

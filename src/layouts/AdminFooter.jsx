const AdminFooter = () => {
  return (
    <>
      <footer
        style={{ backgroundColor: "#fff" }}
        className="pt-5 d-flex justify-content-between"
      >
        <span>
          Copyright © 2022 <a href="#">Name</a>
        </span>
        <ul className="nav m-0">
          <li className="nav-item">
            <a className="nav-link text-secondary" aria-current="page" href="#">
              Privacy Policy
            </a>
          </li>

          <li className="nav-item">
            <a className="nav-link text-secondary" href="#">
              Contact
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default AdminFooter;

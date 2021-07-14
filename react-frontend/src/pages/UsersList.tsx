/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { useEffect } from "react";
import Wrapper from "../components/Wrapper";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import "../public/Public.css";
import UserInfo from "./UserInfo";

const RepositoriesList: React.FC = () => {
  const { getUserList, deleteUser, toggelModalForm } = useActions(); //bind action creators to component
  const { data, loading, error, toggleModal } = useTypedSelector(
    (state) => state.usersList
  ); //access global state in component

  const handleClose = () => {
    toggelModalForm({
      toggle: false,
      name: "",
      email: "",
      id: "",
      role: "",
      action: "create",
    });
  };

  const handleShow = () => {
    toggelModalForm({
      toggle: true,
      name: "",
      email: "",
      id: "",
      role: "",
      action: "create",
    });
  };

  useEffect(() => {
    getUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const promptDeleteUser = (id: string) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("This action will delete this user. Continue?")) {
      deleteUser(id);
    }
  };

  const updateUserForm = (
    name: string,
    email: string,
    role: string,
    id: string
  ) => {
    if (id) {
      toggelModalForm({
        toggle: true,
        name,
        email,
        role,
        id,
        action: "update",
      });
    } else {
      alert("No ID for the selected user!");
    }
  };

  return (
    <Wrapper>
      <div
        className="row justify-content-between col-9 mx-auto"
        style={{ marginBottom: "10px" }}
      >
        <div className="col-4 d-flex justify-content-start">
          <span style={{ fontWeight: "bold", color: "#000", fontSize: "20px" }}>
            Users
          </span>
        </div>
        <div className="col-5 d-flex justify-content-end">
          <button
            type="button"
            className="btn"
            onClick={handleShow}
            style={{ backgroundColor: "#00b8c5", color: "#ffffff" }}
          >
            <i className="fa fa-plus"></i>&nbsp;&nbsp;Create User
          </button>
        </div>
      </div>

      {toggleModal && <UserInfo handleClose={handleClose} />}

      <div className="row ">
        <div className="col-9 mx-auto">
          <main role="main" className="col-md-12 ml-sm-auto col-lg-12 px-md-4">
            <div className="table-responsive">
              {error && <h3 style={{ color: "#A00" }}>{error}</h3>}
              {loading && <h3>Loading...</h3>}
              {!loading && (
                <table
                  className="table table-curved"
                  style={{ backgroundColor: "#ffffff" }}
                >
                  <tr>
                    <td>NAME</td>
                    <td>EMAIL</td>
                    <td>ROLE</td>
                    <td>ACTIONS</td>
                  </tr>
                  <tbody>
                    {data.map((user) => (
                      <tr key={user._id} style={{ fontWeight: "bold" }}>
                        <td>
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              updateUserForm(
                                user.name,
                                user.email,
                                user.role,
                                user._id ? user._id : ""
                              )
                            }
                          >
                            {user.name}
                          </a>
                        </td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              promptDeleteUser(user._id ? user._id : "")
                            }
                          >
                            <i className="fa fa-trash"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </main>
        </div>
      </div>
    </Wrapper>
  );
};

export default RepositoriesList;

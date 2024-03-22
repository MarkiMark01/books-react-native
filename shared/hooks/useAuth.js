import { useSelector } from "react-redux";
import { isAuth } from "../../redux/auth/authSelectors";

const useAuth = () => {
  const result = useSelector(isAuth);

  return result;
};
export default useAuth;

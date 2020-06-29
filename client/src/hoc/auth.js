import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function(WrappedComponent, option, adminRoute = null) {
  const dispatch = useDispatch();
  function AuthenticationCheck(props) {
    // option - null : 아무나 출입 가능, true : 로그인 유저만, false: 로그인 유저 불가능
    // adminRoute - null, true, false
    // 가져온 상태를 가지고 분기 처리를 해준다.
    //   {
    //     user: req.user,
    //     isAdmin: req.user.role === 0 ? false : true,
    //     isAuth: true
    //   }
    useEffect(() => {
      dispatch(authUser()).then(res => {
        console.log("res.payload:", res.payload);
        if (option) {
          if (!res.payload.isAuth) {
            props.history.push("/login");
          } else {
            if (adminRoute && !res.payload.isAdmin) {
              props.history.push("/");
            }
          }
        } else {
          props.history.push("/");
        }
      });
    }, []);

    return <WrappedComponent {...props} />;
  }

  return AuthenticationCheck;
}

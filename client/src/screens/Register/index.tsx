import React, { useState } from "react";
import BasicInput from "../../components/BasicInput";
import { registerData } from "./Registerdata";
const Register = () => {
    const [registerState, setRegister] = useState(registerData);
  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
        Register
      </h2>
      <form className="grid grid-cols-2 gap-2">
  {registerState.map((state, index) => {
    return (
      <div key={state.label} className="mb-2">
        <BasicInput
          label={state.label}
          placeholder={state.placeHolder}
          required
          id={state.label}
          type={state.type}
        />
      </div>
    );
  })}
  <div className="flex flex-col">
<label htmlFor="country" className="text-gray-800 dark:text-white">Country</label>
<select id="country" name="country" style={{height:"2.5rem"}}>
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="fiat">Fiat</option>
  <option value="audi">Audi</option>
</select>
</div>
</form>
    </div>
  );
};

export default Register;

import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ktsRequest from "../../ultis/ktsrequest";
const Register = () => {
  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [repassword, setRepassword] = useState("");
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [cityCode, setCityCode] = useState("");
  const [districtCode, setDistrictCode] = useState("");
  const [wardCode, setWardCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [wardName, setWardName] = useState("");
  const [cityFullName, setCityFullName] = useState("");
  const [districtFullName, setDistrictFullName] = useState("");
  const [wardFullName, setWardFullName] = useState("");
  const [address, setAddress] = useState("");
  const [check, setCheck] = useState(false);
  useEffect(() => {
    const getCities = async () => {
      try {
        const res = await axios.get("https://api.ktscorp.vn/api/cities");
        const data = Object.values(res.data);
        setCities(data);
      } catch (error) {
        toast.error(error);
      }
    };
    getCities();
  }, []);
  useEffect(() => {
    const getDistricts = async () => {
      try {
        const resd = await axios.get(
          `https://api.ktscorp.vn/api/cities/districts/${cityCode}`
        );
        const cName = cities.find((city) => city.code === cityCode);
        const data = Object.values(resd.data);
        setDistricts(data);
        setCityName(cName.name);
        setCityFullName(cName.name_with_type);
      } catch (error) {
        toast.error(error);
      }
    };
    getDistricts();
  }, [cityCode]);
  useEffect(() => {
    const getWards = async () => {
      try {
        const resw = await axios.get(
          `https://api.ktscorp.vn/api/cities/wards/${districtCode}`
        );
        const data = Object.values(resw.data);
        const dName = districts.find((d) => d.code === districtCode);
        setWards(data);
        setDistrictName(dName.name);
        setDistrictFullName(dName.name_with_type);
      } catch (error) {
        toast.error(error);
      }
    };
    getWards();
  }, [districtCode]);
  useEffect(() => {
    const getWard = () => {
      if (wardCode) {
        const wName = wards.find((w) => w.code === wardCode);
        setWardName(wName.name);
        setWardFullName(wName.name_with_type);
      }
    };
    getWard();
  }, [wardCode]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!name) {
      toast.warn("Vui l??ng ch???n T??n ????ng nh???p!");
      return;
    }
    if (!password) {
      toast.warn("M???t kh???u kh??ng h???p l???!");
      return;
    }
    if (repassword !== password) {
      toast.warn("X??c nh???n m???t kh???u kh??ng kh???p");
      return;
    }
    if (!phone) {
      toast.warn("Vui l??ng cung c???p s??? ??i???n tho???i!");
      return;
    }
    if (!address) {
      console.log(address);
      toast.warn("Vui l??ng nh???p ?????a ch???");
      return;
    }
    if (!cityCode) {
      toast.warn("Vui l??ng ch???n t???nh th??nh!");
      return;
    }
    if (!districtCode) {
      toast.warn("Vui l??ng ch???n qu???n huy???n!");
      return;
    }
    if (!wardCode) {
      toast.warn("Vui l??ng ch???n ph?????ng x??!");
      return;
    }
    const data = JSON.stringify({
      name,
      password,
      phone,
      displayName,
      cityCode,
      districtCode,
      wardCode,
      cityName,
      districtName,
      wardName,
      cityFullName,
      districtFullName,
      wardFullName,
      address,
    });

    const config = {
      method: "post",
      url: "/auth/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    ktsRequest(config)
      .then(function (response) {
        toast.success("????ng k?? th??nh c??ng!");
        setName("");
        setDisplayName("");
        setPassword("");
        setRepassword("");
        setPhone("");
        setCityCode("");
        setDistrictCode("");
        setWardCode("");
        setAddress("");
      })
      .catch(function (error) {
        toast.error("T??n ????ng nh???p ???? c?? ng?????i s??? d???ng!");
      });
  };

  return (
    <div className="flex h-screen items-center bg-login bg-cover bg-fixed bg-center bg-no-repeat">
      <div className="mx-auto flex w-5/6 flex-col items-center justify-center px-6 py-8 md:h-screen md:w-4/6 lg:w-8/12 lg:py-0">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-4 md:space-y-3">
            <div className="flex justify-center">
              {/* <img src={logo} className="mr-3 h-12" alt="ktscorp Logo" /> */}
              <h3 className="uppercase font-bold">????ng k?? t??i kho???n</h3>
            </div>
            {/* content */}
            <div className=" flex flex-col gap-2">
              <span className="flex pl-2 after:ml-1 after:text-red-500 after:content-['*']">
                <input
                  type="text"
                  placeholder="User name ..."
                  name="name"
                  value={name}
                  className="border-grey-light w-full rounded border p-2  focus:border-primary focus:outline-none"
                  required="abc"
                  onChange={(e) => setName(e.target.value)}
                />
              </span>
              <div className="pr-2.5 pl-2">
                <input
                  type="text"
                  placeholder="Shop name ..."
                  name="displayname"
                  value={displayName}
                  className="border-grey-light block w-full rounded border p-2 focus:border-primary focus:outline-none"
                  required="abc"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="flex pl-2 after:ml-1 after:text-red-500 after:content-['*']">
                <input
                  type="password"
                  placeholder="Password ..."
                  name="password"
                  value={password}
                  className="border-grey-light block w-full rounded border p-2 focus:border-primary focus:outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="flex pl-2 after:ml-1 after:text-red-500 after:content-['*']">
                <input
                  type="password"
                  placeholder="Confirm Password ..."
                  name="repassword"
                  value={repassword}
                  className="border-grey-light block w-full rounded border p-2 focus:border-primary focus:outline-none"
                  onChange={(e) => setRepassword(e.target.value)}
                />
              </div>
              <div className="flex pl-2 after:ml-1 after:text-red-500 after:content-['*']">
                <input
                  type="text"
                  placeholder="S??? ??i???n tho???i ..."
                  name="phone"
                  value={phone}
                  className="border-grey-light block w-full rounded border p-2 focus:border-primary focus:outline-none"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex pl-2 after:ml-1 after:text-red-500 after:content-['*']">
                <select
                  id="cities"
                  class="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                  onChange={(e) => setCityCode(e.target.value)}
                >
                  <option selected>T???nh/Th??nh</option>
                  {cities.map((i) => {
                    return (
                      <option value={i.code} key={i.code}>
                        {i.name_with_type}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex pl-2 after:ml-1 after:text-red-500 after:content-['*']">
                <select
                  id="districts"
                  class="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                  onChange={(e) => setDistrictCode(e.target.value)}
                >
                  <option selected>Qu???n/Huy???n</option>
                  {districts.map((i) => {
                    return (
                      <option value={i.code} key={i.code}>
                        {i.name_with_type}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex pl-2 after:ml-1 after:text-red-500 after:content-['*']">
                <select
                  id="wards"
                  class="block w-full rounded border border-gray-300 bg-gray-50 p-2 text-sm text-gray-900 focus:border-primary focus:ring-primary"
                  onChange={(e) => setWardCode(e.target.value)}
                >
                  <option selected>Ph?????ng/X??</option>
                  {wards.map((i) => {
                    return (
                      <option value={i.code} key={i.code}>
                        {i.name_with_type}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex pl-2 after:ml-1 after:text-red-500 after:content-['*']">
                <input
                  type="text"
                  placeholder="S??? nh??, t??n ???????ng ..."
                  name="displayname"
                  value={address}
                  className="border-grey-light block w-full rounded border p-2 focus:border-primary focus:outline-none"
                  required="abc"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div className="flex px-3 gap-2">
                <input
                  type="checkbox"
                  className="accent-green-600 text-white"
                  onChange={(e) => setCheck(!check)}
                />
                <span className="text-xs">
                  B???ng vi???c ???n v??o n??t ????ng k??, t??i ?????ng ?? v???i ??i???u kho???n s???
                  d???ng c???a sale168.com
                </span>
              </div>
            </div>
            <div className="px-2.5">
              <button
                type="submit"
                className={`w-full rounded ${
                  check ? "bg-primary hover:bg-green-700" : "bg-slate-400"
                } px-5 py-3 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-primary`}
                onClick={handleClick}
                disabled={!check}
              >
                ????ng k?? th??nh vi??n
              </button>
            </div>

            <ToastContainer />
            <div className="flex items-center justify-between">
              <Link
                to="/"
                className="text-sm font-medium text-primary hover:underline "
              >
                Trang ch???
              </Link>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ???? c?? t??i kho???n?
                <Link
                  to="/login"
                  className="ml-2 font-medium text-primary hover:underline "
                >
                  ????ng nh???p
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

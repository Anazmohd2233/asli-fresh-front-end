import Image from "next/image";
import dayjs from "dayjs";

//internal import

import OfferTimer from "@components/coupon/OfferTimer";
import { getShowingCoupons } from "@services/CouponServices";
import CouponCodeButton from "@components/coupon/CouponCodeButton";
import { getGlobalSetting } from "@services/SettingServices";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Coupon = async ({ couponInHome }) => {
  const { globalSetting } = await getGlobalSetting();
  const currency = globalSetting?.default_currency || "₹";

  const { coupons, error } = await getShowingCoupons();
  const { showingTranslateValue } = useUtilsFunction();

  // console.log("coupon  data", coupons);

  return (
<></>
  );
};

export default Coupon;

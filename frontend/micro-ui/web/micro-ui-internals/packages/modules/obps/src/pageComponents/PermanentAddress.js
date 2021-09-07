import { CardLabel, CheckBox, CitizenInfoLabel, FormStep, Loader, TextInput } from "@egovernments/digit-ui-react-components";
import React, { useState } from "react";
import Timeline from "../components/Timeline";

const PermanentAddress = ({ t, config, onSelect, value, userType, formData }) => {
  let validation = {};
  const onSkip = () => onSelect();
  const [PermanentAddress, setPermanentAddress] = useState(formData?.LicneseDetails?.PermanentAddress || formData?.formData?.LicneseDetails?.PermanentAddress);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const stateId = Digit.ULBService.getStateId();
  //const isEdit = window.location.href.includes("/edit-application/") || window.location.href.includes("renew-trade");
  //const { isLoading, data: fydata = {} } = Digit.Hooks.tl.useTradeLicenseMDMS(stateId, "egf-master", "FinancialYear");

//   let mdmsFinancialYear = fydata["egf-master"] ? fydata["egf-master"].FinancialYear.filter(y => y.module === "TL") : [];
//   let FY = mdmsFinancialYear && mdmsFinancialYear.length > 0 && mdmsFinancialYear.sort((x, y) => y.endingDate - x.endingDate)[0]?.code;


  function selectPermanentAddress(e) {
    setPermanentAddress(e.target.value);
  }

  const goNext = () => {

    // sessionStorage.setItem("CurrentFinancialYear", FY);
    if(!(formData?.result && formData?.result?.Licenses[0]?.id))
     onSelect(config.key, { PermanentAddress:PermanentAddress });
    else
    {
      let data = formData?.formData;
      data.LicneseDetails.PermanentAddress = PermanentAddress;
      onSelect("",formData)
    }
  };

  return (
    <React.Fragment>
      <Timeline currentStep={2} flow="STAKEHOLDER" />
      <FormStep
        config={config}
        onSelect={goNext}
        onSkip={onSkip}
        t={t}
        isDisabled={!PermanentAddress}
      >
        <CardLabel>{`${t("BPA_PERMANANT_ADDRESS_LABEL")}*`}</CardLabel>
        <TextInput
          t={t}
          isMandatory={false}
          type={"text"}
          optionKey="i18nKey"
          name="PermanentAddress"
          value={PermanentAddress}
          onChange={selectPermanentAddress}
          //disable={isEdit}
          //{...(validation = { pattern: "^[a-zA-Z-.`' ]*$", isRequired: true, type: "text", title: t("TL_INVALID_TRADE_NAME") })}
        />
      </FormStep>
    </React.Fragment>
  );
};

export default PermanentAddress;
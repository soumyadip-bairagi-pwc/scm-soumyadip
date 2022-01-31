export const setAddressDetailsLW = (data) => {
  let { locationDet } = data;

  let propAddress = {
    city: locationDet?.cityCode?.name,
    doorNo: locationDet?.houseDoorNo,
    buildingName: locationDet?.buildingColonyName,
    locality: {
      code: locationDet?.locality?.code || "NA",
    },
  };

  data.address = propAddress;
  return data;
};

export const setOwnerDetails = (data) => {
  const { address, owners } = data;
  let institution = {},
    owner = [];
  if (owners && owners.length > 0) {
    if (data?.ownershipCategory?.value === "INSTITUTIONALPRIVATE" || data?.ownershipCategory?.value === "INSTITUTIONALGOVERNMENT") {
      institution.designation = owners[0]?.designation;
      institution.name = owners[0]?.inistitutionName;
      institution.nameOfAuthorizedPerson = owners[0]?.name;
      institution.tenantId = address?.city?.code;
      institution.type = owners[0]?.inistitutetype?.value;
      let document = [];
      if (owners[0]?.documents["proofIdentity"]?.fileStoreId) {
        document.push({
          fileStoreId: owners[0]?.documents["proofIdentity"]?.fileStoreId || "",
          documentType: owners[0]?.documents["proofIdentity"]?.documentType?.code || "",
        });
      }
      owner.push({
        altContactNumber: owners[0]?.altContactNumber,
        correspondenceAddress: owners[0]?.permanentAddress,
        designation: owners[0]?.designation,
        emailId: owners[0]?.emailId,
        sameAsPropertyAddress: owners[0]?.isCorrespondenceAddress,
        mobileNumber: owners[0]?.mobileNumber,
        name: owners[0]?.name,
        ownerType: owners[0]?.ownerType?.code || "NONE",
        documents: document,
      });
      data.institution = institution;
      data.owners = owner;
    } else {
      owners.map((ownr) => {
        let document = [];
        if (ownr?.ownerType?.code != "NONE") {
          if (ownr?.documents && ownr?.documents["specialProofIdentity"]) {
            document.push({
              fileStoreId: ownr?.documents["specialProofIdentity"]?.fileStoreId || "",
              documentType: ownr?.documents["specialProofIdentity"]?.documentType?.code || "",
            });
          }
        }
        if (ownr?.documents && ownr?.documents["proofIdentity"]?.fileStoreId) {
          document.push({
            fileStoreId: ownr?.documents["proofIdentity"]?.fileStoreId || "",
            documentType: ownr?.documents["proofIdentity"]?.documentType?.code || "",
          });
        }
        owner.push({
          emailId: ownr?.emailId,
          fatherOrHusbandName: ownr?.fatherOrHusbandName,
          gender: ownr?.gender?.value,
          sameAsPropertyAddress: ownr?.isCorrespondenceAddress,
          mobileNumber: ownr?.mobileNumber,
          name: ownr?.name,
          ownerType: ownr?.ownerType?.code || "NONE",
          permanentAddress: ownr?.permanentAddress,
          relationship: ownr?.relationship?.code,
          documents: document,
        });
      });
      data.owners = owner;
    }
  }
  return data;
};

export const setOwnerDetailsLW = (data) => {
  const { locationDet, owners } = data;
  
  let institution = {},
  owner = [],
  document = [];

  data.ownershipCategory = data?.owners?.ownershipCategory?.value;
  
  if (data?.owners?.ownershipCategory?.value === "INSTITUTIONALPRIVATE" || data?.owners?.ownershipCategory?.value === "INSTITUTIONALGOVERNMENT") {
    institution.designation = owners?.designation;
    institution.name = owners?.inistitutionName;
    institution.nameOfAuthorizedPerson = owners?.name;
    institution.tenantId = locationDet?.city?.code;
    institution.type = owners?.inistitutetype?.value;
    
    owner.push({
      altContactNumber: owners?.altContactNumber,
      permanentAddress: owners?.permanentAddress,
      designation: owners?.designation,
      emailId: owners?.emailId,
      sameAsPropertyAddress: owners?.isCorrespondenceAddress,
      mobileNumber: owners?.mobileNumber,
      name: owners?.name,
      ownerType: owners?.ownerType?.code || "NONE",
      documents: document,
    });
    data.institution = institution;
    data.owners = owner;
  } else {
      owner.push({
        emailId: owners?.emailId,
        fatherOrHusbandName: owners?.fatherOrHusbandName,
        gender: owners?.gender?.value,
        sameAsPropertyAddress: owners?.isCorrespondenceAddress,
        mobileNumber: owners?.mobileNumber,
        name: owners?.name,
        ownerType: owners?.ownerType?.code || "NONE",
        permanentAddress: owners?.permanentAddress,
        relationship: owners?.relationship?.code,
        documents: document,
      });
    data.owners = owner;
  }
  return data;
};

const getUsageTypeLW = (data) => {
  if (data?.isResdential?.code == "RESIDENTIAL") {
    return data?.isResdential?.code;
  } else {
    return data?.usageCategory?.code;
  }
};

export const setPropertyDetailsLW = (data) => {
  let propertyDetails = {};

  const { assemblyDet } = data;
  
  propertyDetails = {
    propertyType: assemblyDet?.BuildingType?.code,
    usageCategory: getUsageTypeLW(assemblyDet),
    // subUsageCategory: 'NONRESIDENTIAL.COMMERCIAL.HOTELS.2STARORBELOW',
    landArea: parseInt(assemblyDet?.floorarea),
    superBuiltUpArea: parseInt(assemblyDet?.constructionArea),
  };

  data.propertyDetails = propertyDetails;
  return data;
};

export const convertToPropertyLightWeight = (data = {}) => {
  let propertyType = data.PropertyType;
  // let subusagetype = data.subusagetype || null;
  let noOfFloors = 1; // data?.noOfFloors;

  data = setOwnerDetailsLW(data);
  data = setAddressDetailsLW(data);
  data = setPropertyDetailsLW(data);

  const formdata = {
    Property: {
      tenantId: data.tenantId,
      address: data.address,
      propertyType: propertyType,
      ...data.propertyDetails,
      ownershipCategory: data?.ownershipCategory,
      owners: data.owners,
      noOfFloors: noOfFloors,
      additionalDetails: {
        isRainwaterHarvesting: false,
      },
      creationReason: "CREATE",
      source: "MUNICIPAL_RECORDS",
      channel: "SYSTEM",
    },
  };
  return formdata;
};
export const stringReplaceAll = (str = "", searcher = "", replaceWith = "") => {
  if (searcher == "") return str;
  while (str.includes(searcher)) {
    str = str.replace(searcher, replaceWith);
  }
  return str;
};
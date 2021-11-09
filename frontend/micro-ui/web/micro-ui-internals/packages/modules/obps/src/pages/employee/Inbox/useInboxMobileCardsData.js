import { useTranslation } from "react-i18next";

const useInboxMobileCardsData = ({parentRoute, table }) => {
    const { t } = useTranslation()

    const dataForMobileInboxCards = table?.map(({ applicationId, date, applicationType, locality, status, owner, sla}) => ({
            [t("TL_COMMON_TABLE_COL_APP_NO")]: applicationId,
            [t("CS_APPLICATION_DETAILS_APPLICATION_DATE")]: date,
            [t("WS_COMMON_TABLE_COL_APP_TYPE_LABEL")]: applicationType,
            [t("ES_INBOX_LOCALITY")]: locality,
            [t("EVENTS_STATUS_LABEL")]: status,
            [t("WF_INBOX_HEADER_CURRENT_OWNER")]: owner,
            [t("ES_INBOX_SLA_DAYS_REMAINING")]: sla
    }))

    return ({ data:dataForMobileInboxCards, linkPrefix:`${parentRoute}/inbox/bpa/`, serviceRequestIdKey:t("TL_COMMON_TABLE_COL_APP_NO")})

}

export default useInboxMobileCardsData
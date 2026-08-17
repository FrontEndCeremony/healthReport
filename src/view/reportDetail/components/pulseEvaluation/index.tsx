import style from "./index.module.less";
import BaseModel from "../baseModel";
import leftHand from "@/assets/leftHand.png";
import rightHand from "@/assets/rightHand.png";
import { useTranslation } from "react-i18next";
import noData from "@/assets/noData.png";
import tripleEnergizer from "@/assets/tripleEnergizer.svg";
export default function PulseEvaluation({
  pulseConditionEvaluation = {},
}: any) {
  const { t } = useTranslation();
  const {
    leftPularResult = {},
    rightPularResult = {},
    comprehensiveResult = "",
    description = "",
  } = pulseConditionEvaluation || {};

  return (
    <>
      <BaseModel title={t("pulse_evaluation")}>
        {rightPularResult?.chenfuInfo?.cun == '' &&
        leftPularResult?.chenfuInfo?.cun =='' ? (
          <div>
            <div className={style.noDataImg}>
              <img src={noData} />
            </div>
            <div className={style.noDataText}>{t("no_pulse_data")}</div>
          </div>
        ) : (
          <div>
            <div className={style.tableModel}>
              <div className={style.tableTitle}>
                <div className={style.titleIcon}>
                  <img src={leftHand} />
                </div>
                <div className={style.titleText}>{t("left_hand")}</div>
              </div>
              <div className={style.tableDetail}>
                <div className={`${style.tableLineHead}`}>
                  <div className={style.headItem}>{t("three_parts")}</div>
                  <div className={style.headItem}>{t("floating_sinking")}</div>
                  <div className={style.headItem}>{t("deficient_solid")}</div>
                  <div className={style.headItem}>{t("chi_shu")}</div>
                </div>
                <div className={`${style.tableLine}`}>
                  <div className={style.lineIcon}>
                    <div className={style.tableCycle}>{t("cun")}</div>
                  </div>
                  <div className={style.lineItem}>
                    {leftPularResult?.chenfuInfo?.cun || "--"}
                  </div>
                  <div className={style.lineItem}>
                    {leftPularResult?.xushiInfo?.cun || "--"}
                  </div>
                  <div className={style.lineItem}>
                    {leftPularResult?.chishuInfo?.cun || "--"}
                  </div>
                </div>
                <div className={`${style.tableLine}`}>
                  <div className={style.lineIcon}>
                    <div className={style.tableCycle}>{t("guan")}</div>
                  </div>
                  <div className={style.lineItem}>
                    {leftPularResult?.chenfuInfo?.guan || "--"}
                  </div>
                  <div className={style.lineItem}>
                    {leftPularResult?.xushiInfo?.guan || "--"}
                  </div>
                  <div className={style.lineItem}>
                    {leftPularResult?.chishuInfo?.guan || "--"}
                  </div>
                </div>
                <div
                  className={`${style.tableLine}`}
                  style={{ borderBottom: "none" }}
                >
                  <div className={style.lineIcon}>
                    <div className={style.tableCycle}>{t("chi")}</div>
                  </div>
                  <div className={style.lineItem}>
                    {leftPularResult?.chenfuInfo?.chi || "--"}
                  </div>
                  <div className={style.lineItem}>
                    {leftPularResult?.xushiInfo?.chi || "--"}
                  </div>
                  <div className={style.lineItem}>
                    {leftPularResult?.chishuInfo?.chi || "--"}
                  </div>
                </div>
              </div>
            </div>
            <div className={style.tableModel}>
              <div className={style.tableTitle}>
                <div className={style.titleIcon}>
                  <img src={rightHand} />
                </div>
                <div className={style.titleText}>{t("right_hand")}</div>
              </div>
              <div className={style.tableDetail}>
                <div className={`${style.tableLineHead}`}>
                  <div className={style.headItem}>{t("three_parts")}</div>
                  <div className={style.headItem}>{t("floating_sinking")}</div>
                  <div className={style.headItem}>{t("deficient_solid")}</div>
                  <div className={style.headItem}>{t("chi_shu")}</div>
                </div>
                <div className={`${style.tableLine}`}>
                  <div className={style.lineIcon}>
                    <div className={style.tableCycle}>{t("cun")}</div>
                  </div>
                  <div className={style.lineItem}>
                    {rightPularResult?.chenfuInfo?.cun || "--"}
                  </div>
                  <div className={style.lineItem}>
                    {rightPularResult?.xushiInfo?.cun || "--"}
                  </div>
                  <div className={style.lineItem}>
                    {rightPularResult?.chishuInfo?.cun || "--"}
                  </div>
                </div>
                <div className={`${style.tableLine}`}>
                  <div className={style.lineIcon}>
                    <div className={style.tableCycle}>{t("guan")}</div>
                  </div>
                  <div className={style.lineItem}>
                    {rightPularResult?.chenfuInfo?.guan || "--"}
                  </div>
                  <div className={style.lineItem}>
                    {rightPularResult?.xushiInfo?.guan || "--"}
                  </div>
                  <div className={style.lineItem}>
                    {rightPularResult?.chishuInfo?.guan || "--"}
                  </div>
                </div>
                <div
                  className={`${style.tableLine}`}
                  style={{ borderBottom: "none" }}
                >
                  <div className={style.lineIcon}>
                    <div className={style.tableCycle}>{t("chi")}</div>
                  </div>
                  <div className={style.lineItem}>
                    {rightPularResult?.chenfuInfo?.chi || "--"}
                  </div>
                  <div className={style.lineItem}>
                    {rightPularResult?.xushiInfo?.chi || "--"}
                  </div>
                  <div className={style.lineItem}>
                    {rightPularResult?.chishuInfo?.chi || "--"}
                  </div>
                </div>
              </div>
            </div>
            <div className={style.bottomTitle}>{t("pulse_result")}</div>
            <div className={style.typeDetail}>
              {t("your_pulse")}&nbsp;
              <span className={style.type}>{comprehensiveResult}</span>
            </div>
            <div className={style.tripleEnergizer}>
              <img src={tripleEnergizer}/>
            </div>
            <div className={style.bottomDetail}>{description}</div>
          </div>
        )}
      </BaseModel>
    </>
  );
}

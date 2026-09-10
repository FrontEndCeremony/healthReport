import style from "./index.module.less";
import BaseModel from "../baseModel";
import { useState, useEffect, useMemo } from "react";
import success_img from "@/assets/success_img.png";
import ward_img from "@/assets/warn_img.png";
import { useTranslation } from "react-i18next";
import noData from "@/assets/noData.png";
export default function Tongue({ tongueEvaluation = {} }: any) {
  const { t } = useTranslation();

  // 防止解构时 tongueEvaluation 为 undefined 导致报错
  const { tongueImage = "", description='' } = tongueEvaluation || {};
  // 舌象特征可能为 null，或数组里混有空元素（解构默认值对 null 不生效），统一归一化成纯数组
  // 注意用 useMemo 保持引用稳定，否则作为 useEffect 依赖会导致无限重渲染
  const tongueCharacteristics = useMemo(
    () =>
      Array.isArray(tongueEvaluation?.tongueCharacteristics)
        ? tongueEvaluation.tongueCharacteristics.filter(Boolean)
        : [],
    [tongueEvaluation]
  );

  const [iconList, setIconList] = useState([]);

  useEffect(() => {
    if (tongueCharacteristics && tongueCharacteristics.length > 0) {
      setIconList(tongueCharacteristics);
    }
  }, [tongueCharacteristics]);
  return (
    <>
      <BaseModel title={t("tongue_evaluation")}>
        {!tongueImage ? (
          <div>
            <div className={style.noDataImg}>
              <img src={noData} />
            </div>
            <div className={style.noDataText}>{t("no_tongue_data")}</div>
          </div>
        ) : (
          <div>
            <div className={style.topModel}>
              <div className={style.tongueIconLeft}>
                {iconList
                  .slice(0, Math.ceil(iconList.length / 2))
                  .map((item: any, index) => {
                    return (
                      <div key={index} className={style.iconItem}>
                        <div>{item.characteristics}</div>
                        <div className={style.iconImg}>
                          <img
                            src={item.isHealthy ? success_img : ward_img}
                            alt=""
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div
                className={`${style.tongueImg} pdf-avoid-break-tongue-image`}
              >
                <div className={style.tongueInner}>
                  <img src={tongueImage} alt="" />
                </div>
              </div>
              <div className={style.tongueIconRight}>
                {iconList
                  .slice(Math.ceil(iconList.length / 2))
                  .map((item: any, index) => {
                    return (
                      <div
                        key={Math.ceil(iconList.length / 2) + index}
                        className={style.iconItem}
                      >
                        <div>{item.characteristics}</div>
                        <div className={style.iconImg}>
                          <img
                            src={item.isHealthy ? success_img : ward_img}
                            alt=""
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className={style.tongueText}>
              {tongueCharacteristics?.map((item: any, index: number) => {
                return (
                  <div key={index} className={style.detailModel}>
                    <div className={style.detailTitle}>
                      { index + 1}
                    </div>
                    <div className={style.detailText}>{item.characteristics}：{item.description}</div>
                  </div>
                );
              })}
            </div>
            
            <div className={style.title}>{t("tongue_analysis")}</div>
            <div className={style.tongueDetail}>{description}</div>
          </div>
        )}
      </BaseModel>
    </>
  );
}

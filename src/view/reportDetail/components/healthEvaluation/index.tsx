import style from "./index.module.less";
import BaseModel from "../baseModel";
import personImg from "@/assets/person_img.png";
import { Rate } from "antd";
import { useTranslation } from "react-i18next";

export default function HealthEvaluation({ comprehensiveAnalysis = {} }: any) {
  const { t } = useTranslation();
  const { liverScore = 0, heartScore = 0, spleenScore = 0, lungsScore = 0, renalScore = 0, ComprehensiveScore = 0, comprehensiveDescription = '' } = comprehensiveAnalysis || {}

  return (
    <>
      <BaseModel title={t('health_evaluation')}>
        <div className={style.starModel}>
          <div className={style.ring}>
            <div className={`${style.cycle} ${style.liverCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={liverScore / 20 } />
              </div>
              <div>{t('liver')}</div>
              <div>{t('gallbladder')}</div>
            </div>
            <div className={`${style.cycle} ${style.kidneyCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={renalScore / 20 } />
              </div>
              <div>{t('kidney')}</div>
              <div>{t('bladder')}</div>
            </div>
            <div className={`${style.cycle} ${style.lungCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={lungsScore / 20 } />
              </div>
              <div>{t('lung')}</div>
              <div>{t('large_intestine')}</div>
            </div>
            <div className={`${style.cycle} ${style.spleenCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={spleenScore / 20 } />
              </div>
              <div>{t('spleen')}</div>
              <div>{t('stomach')}</div>
            </div>
            <div className={`${style.cycle} ${style.heartCycle}`}>
              <div className={`${style.star} ${style.customRate}`}>
                <Rate size="small" allowHalf disabled defaultValue={heartScore / 20 } />
              </div>
              <div>{t('heart')}</div>
              <div>{t('small_intestine')}</div>
            </div>
            <div className={style.personImg}>
              <img src={personImg} alt="" />
            </div>
          </div>
        </div>
        <div className={style.bottomTitle}>{t('comprehensive_evaluation')}</div>
        <div className={style.bottomLine}>
          <div
            className={style.triangle}
            style={{
              left: `${ComprehensiveScore}%`,
            }}
          ></div>
          <div className={style.lineText}>
            <div>{t('danger')}</div>
            <div>{t('medium_high_risk')}</div>
            <div>{t('medium_risk')}</div>
            <div>{t('healthy')}</div>
          </div>
        </div>
        <div className={style.bottomDetail}>{comprehensiveDescription}</div>
      </BaseModel>
    </>
  );
}

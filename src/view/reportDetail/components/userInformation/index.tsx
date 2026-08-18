import style from './index.module.less'
import BaseModel from '../baseModel'
import { useTranslation } from 'react-i18next';

export default function UserInformation({ patientInfo = {} }: any) {
    const { t } = useTranslation();

    const { gender, birth_year, height, weight, } = patientInfo || {}
    // 根据出生年月计算年龄
    const notProvided = t('not_provided')
    const age = birth_year ? new Date().getFullYear() - birth_year : notProvided
    // 根据身高体重计算BMI
    const bmi = weight && height ? (weight / (height / 100) ** 2).toFixed(0) : notProvided

    return <>
        <BaseModel title={t('patient_info')}>
            <div className={style.lineDetail}>
                <div className={style.detailItem}>
                    <div className={style.label}>{t('gender')}</div>
                    <div className={style.valueText}>{gender || notProvided}</div>
                </div>
                <div className={style.detailItem}>
                    <div className={style.label}>{t('age')}</div>
                    <div className={style.valueText}>{age}{ age != notProvided ?  t('age_unit') : ''}</div>
                </div>
            </div>
            <div className={style.lineDetail}>
                <div className={style.detailItem} style={{ flex: 1.3 }}>
                    <div className={style.label}>{t('height')}</div>
                    <div className={style.valueText}>{height || notProvided} { height ? t('unit_cm') : ''}</div>
                </div>
                <div className={style.detailItem} style={{ flex: 1.1 }}>
                    <div className={style.label}>{t('weight')}</div>
                    <div className={style.valueText}>{weight || notProvided} { weight ? t('unit_kg') : ''}</div>
                </div>
                <div className={style.detailItem}>
                    <div className={style.label}>{t('bmi_label')}</div>
                    <div className={style.valueText}>{bmi}</div>
                </div>
            </div>
        </BaseModel>
    </>
}
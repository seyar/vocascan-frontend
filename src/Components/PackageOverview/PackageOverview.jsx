import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from "../Button/Button.jsx";

import "../../redux/Actions/learn.js";
import { setLearnedPackage } from "../../redux/Actions/learn.js";

import "./PackageOverview.scss";

const PackageOverview = ({ data }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const submitLearn = useCallback(
    (staged) => {
      dispatch(
        setLearnedPackage({
          foreignWordLanguage: data.foreignWordLanguage,
          translatedWordLanguage: data.translatedWordLanguage,
          //using fixed value until server gives us this property
          languagePackageId: data.id,
          vocabsToday: data.stats.vocabularies.learnedToday.dueToday,
          staged,
        })
      );
      history.push(`learn/direction/`);
    },
    [
      data.foreignWordLanguage,
      data.id,
      data.stats.vocabularies.learnedToday.dueToday,
      data.translatedWordLanguage,
      dispatch,
      history,
    ]
  );

  return (
    <div className="package-overview">
      <h1 className="package-inner package-heading">{data?.name}</h1>
      <p className="package-inner package-unresolved">
        {t("components.packageOverview.unresolved")}{" "}
        {data?.stats?.vocabularies?.unresolved}
      </p>
      <p className="package-inner package-today">
        {t("components.packageOverview.today")}{" "}
        {data?.stats?.vocabularies?.learnedToday?.dueToday}
      </p>
      <p className="package-inner package-unactivated">
        {t("components.packageOverview.unactivated")}{" "}
        {data?.stats?.vocabularies?.unactivated}
      </p>
      <div className="package-inner package-btn-wrapper">
        <Button block uppercase onClick={() => submitLearn(false)}>
          {t("global.learn")}
        </Button>
      </div>
      <div className="package-btn-wrapper">
        <Button
          variant="outline"
          appearance="primary-light"
          uppercase
          block
          onClick={() => submitLearn(true)}
        >
          {t("global.activate")}
        </Button>
      </div>
    </div>
  );
};

export default PackageOverview;

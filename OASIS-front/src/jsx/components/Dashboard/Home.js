import React from "react";
import Nav from "../../layouts/nav";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { Card, Col, Row } from "react-bootstrap";

const PowerBI = () => {
  return (
    <Row>
      <Col lg={12}>
        <PowerBIEmbed
          embedConfig={{
            type: "report",
            tokenType: models.TokenType.Aad,
            id: "5b526ed3-418c-402a-a331-81e910c0d0b1",
            embedUrl:
              "https://app.powerbi.com/view?r=eyJrIjoiNjI5N2JmNTctMjIxZC00MmFlLWJjNTAtMTc3MzBlNjg0OThiIiwidCI6IjJhMmM1OGU3LTIwNWQtNGM4YS1iMmIzLTI0ODFmYWJiOWJiYSJ9",
            settings: {
              panes: {
                filters: {
                  expanded: true,
                  visible: false,
                },
              },
            },
          }}
          eventHandlers={
            new Map([
              [
                "loaded",
                function () {
                  console.log("Report loaded");
                },
              ],
              [
                "rendered",
                function () {
                  console.log("Report rendered");
                },
              ],
              [
                "error",
                function (event) {
                  console.log(event.detail);
                },
              ],
            ])
          }
          cssClassName="powerbi-embed-container"
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
            window.report.fullscreen();
          }}
        />
      </Col>
    </Row>
  );
};

export default PowerBI;

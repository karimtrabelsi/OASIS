import React from "react";
import Nav from "../../layouts/nav";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Dropdown,
  ProgressBar,
  Button,
} from "react-bootstrap";

const PowerBI = () => {
  return (
    <Card>
  <Card.Body>
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
                },
              ],
              [
                "rendered",
                function () {
                },
              ],
              [
                "error",
                function (event) {
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
  </Card.Body>
</Card> 
  );
};

export default PowerBI;

import { Card, Badge, Banner, Button, RadioButton } from "@shopify/polaris";
import { LegacyStack } from "@shopify/polaris";
import { useState } from "react";

export default function ReviewCard({ review }) {
  const [selected, setSelected] = useState("friendly");
  return (
    <Card sectioned>
      <div style={{ color: "#212B36" }}>
        <h3 style={{ marginBottom: "20px" }}>
          {"⭐".repeat(review.rating)} {review.body}
        </h3>
        <p style={{ color: "#637381" }}>{review.title}</p>
        <p>
          By {review.author} • {review.date}
        </p>
      </div>
      <div
        style={{
          margin: "1rem 0",
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Badge tone={review.sentiment === "POSITIVE" ? "success" : "critical"}>
          {review.sentiment}
        </Badge>
        {review.flagged && (
          <Banner status="warning">
            Contains: {review.flagged.join(", ")}
          </Banner>
        )}
      </div>
      <LegacyStack alignment="center">
        <LegacyStack.Item>
          <RadioButton
            label="Friendly"
            checked={selected === "friendly"}
            onChange={() => setSelected("friendly")}
          />
        </LegacyStack.Item>
        <LegacyStack.Item>
          <RadioButton
            label="Empathetic"
            checked={selected === "empathetic"}
            onChange={() => setSelected("empathetic")}
          />
        </LegacyStack.Item>
        <LegacyStack.Item>
          <RadioButton
            label="Bold"
            checked={selected === "bold"}
            onChange={() => setSelected("bold")}
          />
        </LegacyStack.Item>
      </LegacyStack>

      <div
        style={{
          backgroundColor: "#F9FAFB",
          padding: "1rem",
          borderRadius: "4px",
          margin: "1rem 0",
        }}
      >
        {review.response[selected]}
      </div>

      <div style={{ display: "flex", gap: "1rem" }}>
        <Button outline>Edit</Button>
        <Button primary>Approve</Button>
      </div>
    </Card>
  );
}

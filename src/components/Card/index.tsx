import React from "react";
import "./Card.scss";
import { Avatar, Card } from "antd";

interface Props {
  style?: React.CSSProperties;
  cover: string;
  actions: React.ReactNode[];
  title: string;
  description: string;
}

const { Meta } = Card;

const CardComponent: React.FC<Props> = (props) => {
  const { actions, cover, description, title, style } = props;

  return (
    <Card
      style={style}
      className="web-components-card-container"
      cover={<img src={cover} />}
      actions={actions}
    >
      <Meta
        avatar={
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
        }
        title={title}
        description={description}
      />
    </Card>
  );
};

export default CardComponent;

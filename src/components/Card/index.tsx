import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";

/* interface Props {
  style?: React.CSSProperties;
  cover: string;
  actions: React.ReactNode[];
  title: string;
  description: string;
} */

const { Meta } = Card;

const CardComponent: React.FC = () => {
  return (
    <Card
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
        }
        title="Card title"
        description="This is the description"
      />
    </Card>
  );
};

export default CardComponent;

/* const { actions, cover, description, title, style } = props; */
{
  /* <Card style={style} cover={<img src={cover} />} actions={actions}>
      <Meta
        avatar={
          <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
        }
        title={title}
        description={description}
      />
    </Card> */
}

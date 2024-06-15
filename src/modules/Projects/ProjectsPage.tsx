import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProjectsContext from "../../context/ProjectsContext"
import '../UserStories/userStory.css'
import UserStoriesBox from "./components/UserStoriesBox"
import './project.css'
import ItemsContext from "../../context/ItemsContext"
import { Button, Form, Input, Select } from "antd"
import DoDate from "@doolooper/dodate"
import AuthContext from "../../context/AuthContext"
import { CloseCircleOutlined } from "@ant-design/icons"

function ProjectsPage() {
  const [selectedUser, setSelectedUser] = useState(undefined)
  const projectsContext = ProjectsContext()
  const itemsContext = ItemsContext()
  const authContext = AuthContext()
  useEffect(() => {
    authContext.fetchAll()
  }, [])
  const { id } = useParams()
  const [form] = Form.useForm()
  useEffect(() => {
    if (id) {
      projectsContext.getById(id)
    }
  }, [id])
  if (!projectsContext.targetItem) {
    return <p>LOADING DATA</p>
  }
  return (
    <div className="rootElement">
      <div className="pageWrapper">
        <div className="projectInfo">
          <h1 className="projectTile">{projectsContext.targetItem.title}</h1>
          <p>{projectsContext.targetItem.description}</p>
          <div className="projectUsers">
            <div style={{padding: "1rem 1.5rem 0"}}>کاربران</div>
            <div className="userSelectWrapper">
              <Select style={{ display: "block", width: "100%" }} value={selectedUser} onChange={setSelectedUser}>
                {authContext.users.map(u => {
                  return <Select.Option key={u.id} value={u.id}>{u.username}</Select.Option>
                })}
              </Select>
              <Button
                disabled={!selectedUser}
                type="primary"
                onClick={async () => {
                  await projectsContext.joinUser(projectsContext.targetItem.id, selectedUser)
                  setTimeout(async () => {
                    await projectsContext.getById(projectsContext.targetItem.id)
                    setSelectedUser(undefined)
                  }, 100);
                }}>افزودن</Button>
            </div>
            {projectsContext.targetItem?.users.map((u: any) => {
              return <div className="userCard">
                <div className="username"><div className="avatar">{(u.username.slice(0, 1) as string).toUpperCase()}</div> <strong>{u.username}</strong></div>
                <CloseCircleOutlined onClick={() => {
                  projectsContext.removeUser(projectsContext.targetItem.id, u.id)
                  setTimeout(async () => {
                    await projectsContext.getById(projectsContext.targetItem.id)
                    setSelectedUser(undefined)
                  }, 100);
                }} />
              </div>
            })}
          </div>
          {itemsContext.targetItem ? <div className="discussions">
            <Form
              className="messageForm"
              style={{ margin: "0 1rem" }}
              form={form}
              layout="vertical"
              onFinish={(values) => {
                try {
                  itemsContext.saveNewMessage(itemsContext.targetItem.id, values)
                  form.resetFields()
                  setTimeout(() => {
                    itemsContext.getById(itemsContext.targetItem.id as string)
                  }, 100);
                } catch (error) {

                }
              }}>
              <Form.Item style={{ marginBottom: 0, width: "100%" }} label="متن پیام" name="message">
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit">ارسال</Button>
            </Form>
            <div className="messagesBox">
              {itemsContext.targetItem.discussions?.map(chat => {
                return <div className="msgBox">
                  <div className="msgDate">{DoDate.parse(chat.createDate).formatJalali("YYYY/MM/DD HH:mm")}</div>
                  <div className="msg">{chat.message}</div>
                </div>
              })}
            </div>
          </div> : null}
        </div>
        <UserStoriesBox projectId={id} />
      </div>
    </div>
  )
}

export default ProjectsPage
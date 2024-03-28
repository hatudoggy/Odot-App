//Hooks
import { useDispatch } from "react-redux";
import { ReactNode, FormEvent, useState } from "react";
import { SingleValue, MultiValue } from "react-select";

//Components
import InlineTextInput from "../InlineTextInput";
import InlineTextAreaInput from "../InlineTextArea";
import InlineSelectable, { SelectOption } from "../InlineSelectable";
import InlineCalendar from "../InlineCalendar";

//Icons
import { PiTextTBold } from "react-icons/pi";
import { PiLinkSimpleBold } from "react-icons/pi";
import { PiTagSimpleBold } from "react-icons/pi";
import { PiVideoBold } from "react-icons/pi";
import { PiTextAlignJustifyBold } from "react-icons/pi";

import { MdOutlineEmojiObjects } from "react-icons/md";

//Redux
import { closeModal } from "../../features/modal/modalSlice";

//DB
import { RepoItem, db } from "../../localdb/db";
import { useLiveQuery } from "dexie-react-hooks";

function RepoAddModal() {
  const dispatch = useDispatch();

  const handleAddRepo = (repoItem: RepoItem) => {
    db.repo.add({
      title: repoItem.title,
      link: repoItem.link,
      media: repoItem.media,
      tags: repoItem.tags,
      description: repoItem.description,
      createdAt: repoItem.createdAt,
      updatedAt: repoItem.updatedAt,
    });
  };

  const repoMediasQuery = useLiveQuery(() => db.repoMedia.reverse().toArray());

  const repoTagsQuery = useLiveQuery(() => db.repoTag.reverse().toArray());

  const [repoMedia, setRepoMedia] = useState<SelectOption>({
    value: "",
    label: "",
  });
  const [repoTags, setRepoTags] = useState<SelectOption[]>([]);

  const handleFormSubmission = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const repoTitle = formData.get("repoTitle")?.toString();
    const repoLink = formData.get("repoLink")?.toString();
    //const repoMedia = formData.get('repoMedia')
    //const repoTags = formData.get('repoTags')
    const repoDescription = formData.get("repoDescription")?.toString();

    const formPayload: RepoItem = {
      title: repoTitle || "",
      link: repoLink || "",
      media: Number(repoMedia?.value) || 0,
      tags: repoTags ? repoTags.map((tag) => Number(tag.value)) : [],
      description: repoDescription || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    handleAddRepo(formPayload);
    dispatch(closeModal());
  };

  const handleCreateNewMediaOption = (newMedia: string) => {
    db.repoMedia
      .add({
        label: newMedia,
        icon: "none",
      })
      .then(async (e) => {
        const newMedia = await db.repoMedia.get(e);
        console.log("E dog", e);
        console.log("NewMedia dog", newMedia);
        if (newMedia && newMedia.id) {
          setRepoMedia({
            value: newMedia.id.toString(),
            label: newMedia.label,
            icon: newMedia.icon,
          });
        }
      });
  };

  const handleCreateNewTagOption = (newTag: string) => {
    db.repoTag
      .add({
        label: newTag,
        color: "#3b3b3b",
      })
      .then(async (e) => {
        const newTag = await db.repoTag.get(e);
        if (newTag && newTag.id) {
          setRepoTags([
            ...repoTags,
            {
              value: newTag.id.toString(),
              label: newTag.label,
              color: newTag.color,
            },
          ]);
        }
      });
  };

  return (
    <div className="p-7 w-screen max-w-xl ">
      <form onSubmit={handleFormSubmission}>
        <div className="flex flex-col gap-4 ">
          <LabeledInput
            className="text-lg"
            name="repoTitle"
            icon={<PiTextTBold />}
            type="line"
            label="Title"
          />
          <LabeledInput
            className="text-lg"
            name="repoLink"
            icon={<PiLinkSimpleBold />}
            type="line"
            label="Link"
          />
          <div className="grid grid-cols-2 gap-4">
            <LabeledInput
              className="text-lg"
              name="repoMedia"
              icon={<PiVideoBold />}
              type="select"
              label="Media"
              options={
                repoMediasQuery?.map((media) => ({
                  value: media.id?.toString() || "",
                  label: media.label,
                  icon: media.icon,
                })) || []
              }
              value={repoMedia}
              onChange={(e) => e && setRepoMedia(e)}
              onCreateOption={handleCreateNewMediaOption}
            />
            <LabeledInput
              className="text-lg"
              name="repoTags"
              icon={<PiTagSimpleBold />}
              type="multiple"
              label="Tags"
              options={
                repoTagsQuery?.map((tag) => ({
                  value: tag.id?.toString() || "",
                  label: tag.label,
                  color: tag.color,
                })) || []
              }
              value={repoTags}
              onChange={(e) => e && setRepoTags([...e])}
              onCreateOption={handleCreateNewTagOption}
            />
          </div>
          <LabeledInput
            name="repoDescription"
            icon={<PiTextAlignJustifyBold />}
            type="area"
            label="Description"
          />
        </div>

        <div className="pt-7 flex justify-end gap-3">
          <button
            type="submit"
            className="p-2 px-5 bg-gray-600 rounded-md text-base"
          >
            Add
          </button>
          <button
            type="button"
            className="p-2"
            onClick={() => dispatch(closeModal())}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

type LabeledInputProps =
  | LabeledInputText
  | LabeledInputSelect
  | LabeledInputMultiple
  | LabeledInputCalendar;

interface LabeledInputBase {
  name?: string;
  icon?: ReactNode;
  label: string;
  placeholder?: string;
  className?: string;
}

interface LabeledInputText extends LabeledInputBase {
  type: "line" | "area";
  value?: string;
}

interface LabeledInputSelect extends LabeledInputBase {
  type: "select";
  options: SelectOption[];
  onChange: (selected: SingleValue<SelectOption> | null) => void;
  onCreateOption?: (createdOption: string) => void;
  value?: SelectOption;
  defaultValue?: SelectOption;
}

interface LabeledInputMultiple extends LabeledInputBase {
  type: "multiple";
  options: SelectOption[];
  onChange: (selected: MultiValue<SelectOption> | null) => void;
  onCreateOption?: (createdOption: string) => void;
  value?: SelectOption[];
  defaultValue?: SelectOption[];
}

interface LabeledInputCalendar extends LabeledInputBase {
  type: "calendar";
  date: Date;
  showTimeSelect?: boolean;
  onChange: (date: Date) => void;
}

export function LabeledInput(props: LabeledInputProps) {
  const handleType = (props: LabeledInputProps) => {
    switch (props.type) {
      case "line":
        return (
          <InlineTextInput
            name={props.name}
            type="text"
            className={`${props.className}`}
            placeholder={props.placeholder}
            defaultValue={props.value}
          />
        );
      case "area":
        return (
          <InlineTextAreaInput
            name={props.name}
            className={`${props.className}`}
            placeholder={props.placeholder}
            rows={3}
            defaultValue={props.value}
          />
        );
      case "select":
        return (
          <InlineSelectable
            name={props.name}
            className={`${props.className}`}
            isMulti={false}
            placeholder=""
            options={props.options}
            onChange={props.onChange}
            onCreateOption={props.onCreateOption}
            value={props.value}
            defaultValue={props.defaultValue}
          />
        );
      case "multiple":
        return (
          <InlineSelectable
            name={props.name}
            className={`${props.className}`}
            isMulti
            placeholder=""
            options={props.options}
            onChange={props.onChange}
            onCreateOption={props.onCreateOption}
            value={props.value}
            defaultValue={props.defaultValue}
          />
        );
      case "calendar":
        return (
          <InlineCalendar
            name={props.name}
            className={`${props.className}`}
            date={props.date}
            showTimeSelect={props.showTimeSelect}
            onChange={props.onChange}
          />
        );
    }
  };

  return (
    <div className="flex flex-col gap-0.5">
      <label
        className={`${
          props.icon !== undefined && "flex items-center gap-1"
        } text-sm opacity-70`}
      >
        <span>{props.icon}</span>
        {props.label}
      </label>
      {handleType(props)}
    </div>
  );
}

export default RepoAddModal;

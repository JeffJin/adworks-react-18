'use client'

import { IImage } from '@/app/lib/models/dtos';
import { useGetImageByIdQuery } from '@/app/lib/services/adworks.api';
import { useState } from 'react'
import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CalendarIcon, PaperClipIcon, TagIcon, UserCircleIcon } from '@heroicons/react/20/solid'

const categories = [
  { name: 'Unassigned', value: null },
  {
    name: 'Wade Cooper',
    value: 'wade-cooper',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
const imageTags = [
  { name: 'Unlabelled', value: null },
  { name: 'Engineering', value: 'engineering' },
]
const dueDates = [
  { name: 'No due date', value: null },
  { name: 'Today', value: 'today' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function EditImage({ id }: { id: string }) {
  const { data } = useGetImageByIdQuery({ id });
  const [category, setCategory] = useState(categories[0])
  const [tags, setTags] = useState(imageTags[0])



  return (
    <form action="#" className="relative">
      <div className="rounded-lg bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
        <label htmlFor="title" className="sr-only">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={data?.title}
          placeholder="Title"
          className="block w-full px-3 pt-2.5 text-lg font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
        />
        <label htmlFor="description" className="sr-only">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={2}
          value={data?.description}
          placeholder="Write a description..."
          className="block w-full resize-none px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          defaultValue={''}
        />

        {/* Spacer element to match the height of the toolbar */}
        <div aria-hidden="true">
          <div className="py-2">
            <div className="h-9" />
          </div>
          <div className="h-px" />
          <div className="py-2">
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-px bottom-0">
        {/* Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. */}
        <div className="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">
          <Listbox as="div" value={category} onChange={setCategory} className="shrink-0">
            <Label className="sr-only">Cateogry</Label>
            <div className="relative">
              <ListboxButton className="relative inline-flex items-center rounded-full bg-gray-50 px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-500 hover:bg-gray-100 sm:px-3">
                {category.value === null ? (
                  <UserCircleIcon aria-hidden="true" className="size-5 shrink-0 text-gray-300 sm:-ml-1" />
                ) : (
                  <img alt="" src={category.avatar} className="size-5 shrink-0 rounded-full" />
                )}

                <span
                  className={classNames(
                    category.value === null ? '' : 'text-gray-900',
                    'hidden truncate sm:ml-2 sm:block',
                  )}
                >
                  {category.value === null ? 'Category' : category.name}
                </span>
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow-sm outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
              >
                {categories.map((assignee) => (
                  <ListboxOption
                    key={assignee.value}
                    value={assignee}
                    className="cursor-default bg-white px-3 py-2 select-none data-focus:relative data-focus:bg-gray-100 data-focus:hover:outline-hidden"
                  >
                    <div className="flex items-center">
                      {assignee.avatar ? (
                        <img alt="" src={assignee.avatar} className="size-5 shrink-0 rounded-full" />
                      ) : (
                        <UserCircleIcon aria-hidden="true" className="size-5 shrink-0 text-gray-400" />
                      )}

                      <span className="ml-3 block truncate font-medium">{assignee.name}</span>
                    </div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>

          <Listbox as="div" value={tags} onChange={setTags} className="shrink-0">
            <Label className="sr-only">Add a tag</Label>
            <div className="relative">
              <ListboxButton className="relative inline-flex items-center rounded-full bg-gray-50 px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-500 hover:bg-gray-100 sm:px-3">
                <TagIcon
                  aria-hidden="true"
                  className={classNames(
                    tags.value === null ? 'text-gray-300' : 'text-gray-500',
                    'size-5 shrink-0 sm:-ml-1',
                  )}
                />
                <span
                  className={classNames(
                    tags.value === null ? '' : 'text-gray-900',
                    'hidden truncate sm:ml-2 sm:block',
                  )}
                >
                  {tags.value === null ? 'Label' : tags.name}
                </span>
              </ListboxButton>

              <ListboxOptions
                transition
                className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow-sm outline-1 outline-black/5 data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
              >
                {imageTags.map((label) => (
                  <ListboxOption
                    key={label.value}
                    value={label}
                    className="cursor-default bg-white px-3 py-2 select-none data-focus:relative data-focus:bg-gray-100 data-focus:hover:outline-hidden"
                  >
                    <div className="flex items-center">
                      <span className="block truncate font-medium">{label.name}</span>
                    </div>
                  </ListboxOption>
                ))}
              </ListboxOptions>
            </div>
          </Listbox>
        </div>
        <div className="flex items-center justify-between space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
          <div className="flex">
            <button
              type="button"
              className="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left text-gray-400"
            >
              <PaperClipIcon aria-hidden="true" className="mr-2 -ml-1 size-5 group-hover:text-gray-500" />
              <span className="text-sm text-gray-500 italic group-hover:text-gray-600">Upload new image</span>
            </button>
          </div>
          <div className="shrink-0">
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

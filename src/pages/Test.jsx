<tbody className="bg-customTablebG">
{sections.map((section, index) => (
  <tr key={section.id}>
    <td className="px-4 py-12 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[220px] md:w-[180px] sm:w-[150px] ">
      <CustomDropdwonPermisson
        options={data.documentStore || []}
        placeholder="Select Document Store"
        isOpen={openDropdown === `${section.id}-0`}
        onDropdownClick={() =>
          handleDropdownClick1(section.id, 0)
        }
        selectedOption={section.values.documentStore || ""}
        setSelectedOption={(value) =>
          handleDropdownChange(
            section.id,
            "documentStore",
            value
          )
        }
      />
    </td>
    <td className="px-4 py-12 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[750px] md:w-[600px] sm:w-[450px] ">
      <CustomDropdwonPermisson
        options={data.documentLocation || []}
        placeholder="Select Document Location"
        isOpen={openDropdown === `${section.id}-1`}
        onDropdownClick={() =>
          handleDropdownClick1(section.id, 1)
        }
        selectedOption={section.values.documentLocation || ""}
        setSelectedOption={(value) =>
          handleDropdownChange(
            section.id,
            "documentLocation",
            value
          )
        }
      />
    </td>
    <td
      className="px-4 py-12 border border-customBorderColor text-customWhite bg-black w-full max-w-full lg:w-[200px] md:w-[180px] sm:w-[150px] "
      // width={"200px"}
    >
      <CustomDropdwonPermisson
        options={data.documentName || []}
        placeholder="Select Document"
        isOpen={openDropdown === `${section.id}-2`}
        onDropdownClick={() =>
          handleDropdownClick1(section.id, 2)
        }
        selectedOption={section.values.documentName || ""}
        setSelectedOption={(value) =>
          handleDropdownChange(
            section.id,
            "documentName",
            value
          )
        }
      />
    </td>

  </tr>
))}
</tbody>
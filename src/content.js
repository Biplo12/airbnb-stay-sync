document.getElementById("syncButton")?.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0]?.id ?? 0 },
      func: () => {
        const titleElement = document.querySelector(
          "div.cebjq77.atm_gi_16hd9yc.atm_l8_19u9s0e.atm_26_116dmco_1nos8r_uv4tnr.atm_26_116dmco_csw3t1.bcr6fui.atm_gq_8tjzot.dir.dir-ltr span.ti0mzn8.atm_am_znbvmj.s12dwtux.atm_c8_km0zk7.atm_g3_18khvle.atm_fr_1m9t47k.atm_7l_1esdqks.atm_cs_6adqpa.atm_sq_1l2sidv.atm_vv_1q9ccgz.atm_ks_15vqwwr.atm_lo_evh4rp.dir.dir-ltr"
        );
        const stayDates = document.querySelector(
          "div.s19bebtr.atm_c8_1uc0753.atm_fr_r7vles.atm_g3_lonqig.atm_ks_15vqwwr.atm_sq_1l2sidv.atm_9s_cj1kg8.atm_6w_1e54zos.atm_fy_cs5v99.atm_cs_19iasv6.atm_7l_1esdqks.atm_lo_t94yts.atm_ks_zryt35__1rgatj2.t1sy79d2.atm_mj_1wugsn5.dir.dir-ltr"
        );

        const stayHours = document.querySelectorAll(
          "div.s8n63gu.atm_h3_evh4rp.dir.dir-ltr"
        );

        const stayHoursArray = Array.from(stayHours);

        const [startHour, endHour] = stayHoursArray.map(
          (element) => element.textContent
        );

        const locationElement = document.querySelectorAll(
          "div.rz78adb.atm_cs_6adqpa.atm_7l_dezgoh.atm_c8_2x1prs.atm_g3_1jbyh58.atm_fr_11a07z3.atm_gq_1yuitx_1nl31kv.dir.dir-ltr p._yz1jt7x"
        );

        const locationElementsArray = Array.from(locationElement);

        const location = locationElementsArray.map(
          (element) => element.textContent
        )[3];

        const [stayDatesFirstPart, stayDatesSecondPart] =
          stayDates?.textContent?.split(" – ");

        const [month, startDay] = stayDatesFirstPart?.split(" ");
        const [endDay, year] = stayDatesSecondPart?.split(", ");

        const title = titleElement?.textContent ?? "N/A";

        const stayUrl = window.location.href;

        const startDate = new Date(`${year}-${month}-${startDay} ${startHour}`);
        const endDate = new Date(`${year}-${month}-${endDay} ${endHour}`);

        const stayInfo = {
          title: title,
          location: location,
          startDate: startDate,
          startHour: startHour,
          endDate: endDate,
          endHour: endHour,
          stayUrl: stayUrl,
        };

        const formattedStartDate =
          stayInfo.startDate.toISOString().replace(/[-:]/g, "").split(".")[0] +
          "Z";
        const formattedEndDate =
          stayInfo.endDate.toISOString().replace(/[-:]/g, "").split(".")[0] +
          "Z";

        const icsContent = `BEGIN:VCALENDAR\r\n
                            VERSION:2.0\r\n
                            PRODID:-//hacksw/handcal//NONSGML v1.0//EN\r\n
                            BEGIN:VEVENT\r\n
                            DTSTART:${formattedStartDate}\r\n
                            DTEND:${formattedEndDate}\r\n
                            LOCATION:${stayInfo.location}\r\n
                            DESCRIPTION:${stayInfo.title}\r\n
                            URL:${stayInfo.stayUrl}\r\n
                            END:VEVENT\r\n
                            END:VCALENDAR\r\n`;

        const blob = new Blob([icsContent], {
          type: "text/calendar;charset=utf-8",
        });

        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = `${stayInfo.title}.ics`;
        downloadLink.click();
      },
    });
  });
});

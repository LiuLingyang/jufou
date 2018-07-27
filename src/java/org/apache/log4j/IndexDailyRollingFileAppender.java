package org.apache.log4j;

import java.io.File;
import java.io.IOException;
import java.util.Calendar;

public class IndexDailyRollingFileAppender extends DailyRollingFileAppender {

	private int maxBackupIndex = 30;

	public IndexDailyRollingFileAppender() {
	}

	public IndexDailyRollingFileAppender(Layout layout, String filename,
										 String datePattern, int maxBackupIndex) throws IOException {
		super(layout, filename, datePattern);
		this.maxBackupIndex = maxBackupIndex;
	}

	public int getMaxBackupIndex() {
		return maxBackupIndex;
	}

	public void setMaxBackupIndex(int maxBackupIndex) {
		this.maxBackupIndex = maxBackupIndex;
	}

	void rollOver() throws IOException {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DATE, 0 - this.maxBackupIndex);
		String datedFilename = this.fileName +
				this.sdf.format(calendar.getTime());
		File target = new File(datedFilename);
		if (target.exists()) {
			target.delete();
		}
		super.rollOver();
	}

}
